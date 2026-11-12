import 'dotenv/config';
import { createBdd, test } from 'playwright-bdd';
import { LoginPage } from '../page/loginpage';
import { logger } from '../../base/logger';

const { Given, When, Then } = createBdd(test);

Given('Estoy en la pagina de inicio de sesion', async ({ page }) => {
  await new LoginPage(page).open();
});

When('Ingreso mi nombre de usuario y contraseña', async ({ page }) => {
  const username = process.env.LOGIN_USERNAME;
  const password = process.env.LOGIN_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'Define las variables de entorno LOGIN_USERNAME y LOGIN_PASSWORD para ejecutar el login.',
    );
  }

  await new LoginPage(page).enterCredentials(username, password);
  logger.info('Credenciales ingresadas');
  
});

When('Click en el boton de inicio de sesion', async ({ page }) => {
  await new LoginPage(page).submit();
});

Then('Deberia ser redirigido al dashboard', async ({ page }) => {
  await new LoginPage(page).expectDashboard();
});