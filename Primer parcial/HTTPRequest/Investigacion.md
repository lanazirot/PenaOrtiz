# HTTP Request Methods ✔️
### Alan Peña Ortiz 19100234
----  

## ¿Qué es una petición HTTP? :question:  
Una petición HTTP es una solicitud que un cliente realiza a un servidor, por medio del protocolo HTTP (Hypertext Transfer Protocol) el cuál tiene como objetivo, desde un cliente, enviar una petición a un host, que puede estar localizado en otra parte, con el fin de que éste último le devuelva una respuesta. La solicitud o petición HTTP se conforma de varios elementos comunes, que se listan a continuación.  

## Elementos de una petición HTTP  
1. Una línea de solicitud o request line es la primera línea que se encuentra en el mensaje de solicitud. La conforma: el __método__ (se discute más adelante), el path a donde se dirige la solicitud y la versión de HTTP que se maneja.  
2. Encabezados o headers de la solicitud, que son escritos para proveer información del mensaje, quien lo envía y la manera en la que el cliente quiere comunicarse a través de.
3. El cuerpo de la solicitud, conocido como el famoso __body__, o cuerpo de la entidad, es el contenido actual del mensaje, el cuál puede venir completo o trozeado (chunked). Esta parte de la petición, es en la cuál regularmente se envian los datos cuando se hacen solicitudes tipo POST o UPDATE.  

## Request Methods (Verbos)  
Se definen ciertos verbos en el protocolo HTTP para indicar la acción deseada para ser ejecutada dado un recurso. Se les llama verbos ya que ejecutan acciones, a pesar de que algunos como HEAD (Cabeza) no sean verbos como tal, en la definición de la palabra. A continuación se analizan los verbos que ofrece HTTP:  


| Request Method | Descripción | Ejemplo casos de uso |
| ------- | --------- | -------- |
| GET | Representa el recurso especificado en la solicitud. Las solicitudes elaboradas con el método GET solo deben retornar información, y regularmente no elaboran más procesos, sólo en casos específicos. | Obtener una lista de estudiantes
| HEAD | Es similar a GET, sin embargo, no debe retornar cuerpo de respuesta. Lo que pretende HEAD es que regrese los HEADers si se hiciera con una solicitud GET. | Comprueba el login del estudiante en el sistema antes de entrar al portal, solicita un token móvil
| POST | Ingresa una solicitud de una entidad específica en un recurso especificado, que regularmente causa un efecto en el estado del mismo o puede realizar efectos también en el servidor. | Crear un nuevo estudiante
| PUT | El verbo PUT trabaja sobre modificaciones, se envía la representación de un mismo elemento y reemplaza el destino con los datos de la petición. Es parecido a POST, pero regularmente se utiliza para actualizaciones de estado, sin obtener efectos secundarios. | Actualizar sólo la edad de un estudiante.
| DELETE | El método DELETE elimina un recurso especificado. | Eliminar un estudiante
| CONNECT | Utilizado para abrir una conexión abierta entre el cliente y servidor. Se utiliza cuando se accede a sitios que usan certificado SSL (HTTPS). | Abrir una sesión en una página
| PATCH | |
| OPTIONS | |

## Response codes
