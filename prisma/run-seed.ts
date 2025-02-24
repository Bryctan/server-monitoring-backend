import { execSync } from 'child_process';

const seederName = process.argv[2]; // Obtiene el nombre del seeder desde la línea de comandos

if (!seederName) {
  console.log('❌ Debes especificar un seeder. Ejemplo: npm run db:seed users');
  process.exit(1);
}

// Construye la ruta del archivo del seeder
const seederPath = `prisma/seeders/${seederName}.seeder.ts`;

try {
  console.log(`🚀 Ejecutando seeder: ${seederName}`);
  execSync(`npx ts-node ${seederPath}`, { stdio: 'inherit' });
} catch (error) {
  console.log(
    `❌ Error al ejecutar el seeder "${seederName}". Asegúrate de que el archivo existe en prisma/seeders/.`,
  );
  process.exit(1);
}
