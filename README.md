# Entrega final React-coderhouse

En esta entrega se agrego login y register de usuarios con firebase database. No representa la seguridad de un login real con auth de firebase. Como check de registro tiene que usuarios no esten iguales
La base de datos esta en firebase con las collections: users,carts, products, categories.
Las imagenes estan subidas a firebase storage.
Se conserva el cart con un flag, persistente entre logins. 
La "sesion" de usuario se fija si pasaron más de 24hs para pedir login de nuevo.
Se agrego un historial con las compras anteriores del usuario logeado.

NOTA: Se puso como base en el vite.config el nombre del repositorio. Esto fue para poder levantar github-pages. El funcionamiento deberia ser el mismo.

