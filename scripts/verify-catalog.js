// Read-only check that the store matches the demo catalog.
// Usage: node scripts/verify-catalog.js (reads .env)
import { loadImagePlan, loadProducts } from './src/catalog.js';
import { createClient, loadConfig } from './src/client.js';
import { loadEnv } from './src/env.js';
import { findOnlineStorePublication } from './src/store.js';
import { verifyStore } from './src/verify.js';

async function main() {
  loadEnv();
  const client = createClient(loadConfig());
  const products = await loadProducts();
  const plan = await loadImagePlan();
  const publicationId = await findOnlineStorePublication(client);

  const { rows, ok } = await verifyStore({ client, products, plan, publicationId });
  for (const { kind, name, problems } of rows) {
    console.log(`${problems.length === 0 ? 'ok  ' : 'FAIL'} ${kind.padEnd(10)} ${name}`);
    for (const problem of problems) console.log(`       - ${problem}`);
  }

  const failed = rows.filter(({ problems }) => problems.length > 0).length;
  console.log(ok ? '\nThe store matches the catalog.' : `\n${failed} item(s) do not match.`);
  if (!ok && rows.some(({ kind, problems }) => kind === 'collection' && problems.length > 0)) {
    console.log('Automated collections fill in the background; if only collections fail, check again in a minute.');
  }
  process.exitCode = ok ? 0 : 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
