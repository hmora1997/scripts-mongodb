# Mongo Scripts
### Este repositorio contiene tres scripts en Node.js para trabajar con MongoDB. Estos scripts te permitirán:

- Probar la conexión a la base de datos.
- Insertar el rol "Admin" en la colección de roles.
- Insertar un usuario en la colección de usuarios.



 ## Requisitos

- Node.js (versión 14 o superior recomendada).
- Una instancia de MongoDB en ejecución.
- En este ejemplo se asume que MongoDB se ejecuta en un contenedor Docker con la siguiente URI:

```bash
mongodb://localhost:27017/AWSDocumentDB
```


## Instalación

Clona o descarga este repositorio en tu máquina.

```bash
git clone https://github.com/hmora1997/scripts-mongodb.git
```
	 
- Abre una terminal en la carpeta del proyecto.
- Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm i
```

## Configuración

Asegúrate de que la URI de conexión a MongoDB sea correcta en cada script. Actualmente se usa:

```js
const uri = "mongodb://localhost:27017/AWSDocumentDB";
```

en el caso de qa deberia ser :
```js
const uri = "mongodb://<usuario>:<contraseña>@<host>:<puerto>/<nombreDB>?authSource=admin";
```
Asegurate que el nombre de la base de datos sea correcta :
```js
AWSDocumentDB
```
Asegurate de que la collections sean correctas  :

```js
RolesBkCollection
```
```js
UsersBkCollection
```


Si tu configuración es diferente, actualiza este valor en los archivos:

- `testConnection.js`
- `insertUser.js`
- `insertAdminRole.js`

## Uso

El archivo package.json incluye tres scripts para facilitar la ejecución de cada módulo. Desde la terminal, en la carpeta del proyecto, puedes usar los siguientes comandos:


Para probar la conexión a MongoDB:

```bash
npm test
```

Este comando ejecuta el script testConnection.js, que se conecta a la base de datos y lista las colecciones existentes.


```bash
npm role
```

Este comando ejecuta el script insertAdminRole.js, que inserta el rol "Admin" en la colección RolesBkCollection.


```bash
npm user
```

Este comando ejecuta el script insertUser.js, que inserta un nuevo documento en la colección UsersBkCollection.



## Descripción de los Scripts
### testConnection.js

- Propósito: Conectarse a la base de datos y listar las colecciones existentes.
- Uso: Verifica que la conexión y la configuración de la base de datos sean correctas.

### insertUser.js

- Propósito: Insertar un nuevo usuario en la colección UsersBkCollection.

Campos insertados:

- firstName
- lastName
- email
- role
- created_at y updated_at (con la fecha actual)

Nota: Si deseas modificar los datos del usuario, edita el objeto newUser en el script.

### insertAdminRole.js

Propósito: Insertar el rol "Admin" en la colección RolesBkCollection.

- Campos insertados:
- name: "Admin"
- permissions: Conjunto de permisos predefinidos.
- created_at y updated_at: Fechas específicas.




