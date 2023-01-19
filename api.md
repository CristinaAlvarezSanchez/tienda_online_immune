- GET /api/products 
    - recupera todos los productos
- POST /api/products
    - Crea un producto
- PUT /api/products/PRODUCTID
    - Edita un producto
- DELETE /api/products/PRODUCTID
    - Borra un producto


## definición de los test 
// muy importante si se crean o modifican usuarios durante las pruebas debe quedarse al finalizar las pruebas todo como estaba (afterAll)
# GET /api/users

- recuperar los usuarios de la bd 
- Devuelve un array con todos los usuarios 
- PRUEBAS: 
    - URL funciona -> status 200
    - Respuesta está en formato JSON 
    - La respuesta debe ser un array de usuarios 


# POST /api/users

- crea un nuevo usuario en la bd
- los datos del nuevo usuario los recibimos a traves del body 
- la respuesta será el usuario creado 
- PRUEBAS: 
    - URL funciona -> status 200 y el content type es JSON 
    - Comprobar que el usuario se ha insertado -> en la respuesta tenemos _id
    - Comprobar que los datos insertados son los correctos 

# PUT /api/users/USERID

- Modifica un usuario en la bd 
- Recibe a través de la URL el id de l usuario a modificar
- los datos modificados los recibimos a través del body
- la respuesta será el usuario modificado
- PRUEBAS: 
    - URL funciona -> status 200 y content type JSON
    - Comprobar si los datos que enviamos son los nuevos datos del usuario 


# DELETE /api/users/USERID

- Borra un usuario en la bd
- Recibe el id del usuario a través de la url 
- Como respuesta devolvemos el usuario borrado 
- PRUEBAS: 
    - URL funciona -> status 200 y content type JSON
    - Buscamos el usuario dentro de la BD si no está es que ha funcionado
