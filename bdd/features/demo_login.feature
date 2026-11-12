Feature: Demo Login

@login
Scenario: Inicio de sesion
    Given Estoy en la pagina de inicio de sesion
    When Ingreso mi nombre de usuario y contraseña
    And Click en el boton de inicio de sesion
    Then Deberia ser redirigido al dashboard