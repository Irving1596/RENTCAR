# RENTCAR
RESTfulAPI para alquiler de vehiculos
# Documentación
## Tecnologias Utilizadas
`App tier: Node.js 12.6` 

`Data tier: Mysql 8.0`  

## IDE utilizado

`Visual Code`   


## Base de Datos 

- `Diagrama ENTIDAD-RELACION`

<img src="https://github.com/Irving1596/RENTCAR/blob/dev/DATA_MODEL_TRENTCAR.png" width="620">


## EndPoints 
1- Lista de autos disponibles para alquiler
- `GET http://localhost:3000/Autos/listAllAutos`

2-El usuario crea una orden para el alquiler de un auto
- `POST http://localhost:3000/Autos/crearOrdenAuto`

   `BODY:`    
    {"ID_CLIENTE":"2",  
    "ID_ASUCURSAL":"2",  
    "ID_SUCURSAL_RETIRO":"1",  
    "ID_SUCURSAL_DEVOLUCION":"1",  
    "FECHA_RETIRO":"2020-10-17",  
    "HORA_RETIRO":"06:00:00",  
    "FECHA_DEVOLUCION":"2020-10-17",  
    "HORA_DEVOLUCION":"16:00:00",  
    "COMENTARIO":"que esL es" 
    }

3- Cualquier otro feature adicional que agregue valor a la aplicacion
- Implementación de autenticación utilizando JWT y encriptación de contraseña.  
Login: Los usuarios acceden a la aplicacion por medio de sus credenciales(USUARIO Y CONTRASEÑA)
    - `POST http://localhost:3000/Clientes/login`  
    
    `BODY:`  
   { 
   "USUARIO":"julio1",  
    
    "PASSWORD":"123456"
   }
## PLUS 
4- Los usuarios crean su cuenta para acceder a la aplicación.
- `POST http://localhost:3000/Clientes/login`. 

   `BODY:`  
  {
  "USUARIO":"julio15",  

  "PASSWORD":"123456",  

  "NOMBRE":"Julio",  

   "APELLIDO":"Garcias",  

  "CORREO":"julio.garcia@hotmail.com",  

  "CELULAR":"67029222"   
  }. 
  
 5- El usuario obtiene los datos de su perfil.
 - `GET http://localhost:3000/Clientes/miPerfil?USUARIO=julio1`. 
     
   `HEADERS:`  
   `x-token	`    `{{token}}`
   
 6- El usuario puede consultar el historial de autos alquilados
  - `GET http://localhost:3000/Clientes/miHistorialAlquiler`. 
     
   `HEADERS:`  
     
   `x-token	`    `{{token}}`
 
 ## Pasos para la instalación. 
 
Tener git, NPM, MySQL y Node.JS instalado. 


Clonar el repositorio. Ejecutar `git clone https://github.com/Irving1596/RENTCAR.git`   

Situarse en el directorio `RENTCAR`   

Ejecutar  `npm install` Con este comando instalara las dependencias necesarias. 

Ejecutar `npm run dev` Este comando levantara el aplicativo .

 
  


