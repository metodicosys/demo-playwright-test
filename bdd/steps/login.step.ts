import 'dotenv/config';
import { Given, When, Then } from '../fixtures/fixture';
import { logger } from '../../base/logger';

Given('Estoy en la pagina de inicio de sesion', async ({ loginPage }) => {
  await loginPage.open();
});

When('Ingreso mi nombre de usuario y contraseña', async ({ loginPage }) => {
  const username = process.env.LOGIN_USERNAME;
  const password = process.env.LOGIN_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'Define las variables de entorno LOGIN_USERNAME y LOGIN_PASSWORD para ejecutar el login.',
    );
  }

  await loginPage.enterCredentials(username, password);
  logger.info('Credenciales ingresadas');
});

When('Click en el boton de inicio de sesion', async ({ loginPage }) => {
  await loginPage.submit();
  logger.info('Boton de inicio de sesion presionado');
});

Then('Deberia ser redirigido al dashboard', async ({ loginPage }) => {
  await loginPage.expectDashboard();
});