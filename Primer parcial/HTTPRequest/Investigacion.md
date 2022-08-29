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
| HEAD | Es similar a GET, sin embargo, no debe retornar cuerpo de respuesta. Lo que pretende HEAD es que regrese los HEADers si se hiciera con una solicitud GET. | Comprueba el login del estudiante en el sistema antes de entrar al portal, solicita un token móvil, comprueba tamaños de archivos
| POST | Ingresa una solicitud de una entidad específica en un recurso especificado, que regularmente causa un efecto en el estado del mismo o puede realizar efectos también en el servidor. | Crear un nuevo estudiante
| PUT | El verbo PUT trabaja sobre modificaciones y creaciones, se envía la representación de un mismo elemento y reemplaza el destino con los datos de la petición. Es parecido a POST, pero regularmente se utiliza para actualizaciones de estado, sin obtener efectos secundarios. | Actualizar datos de un estudiante.
| DELETE | El método DELETE elimina un recurso especificado. | Eliminar un estudiante
| CONNECT | Utilizado para abrir una conexión abierta entre el cliente y servidor. Se utiliza cuando se accede a sitios que usan certificado SSL (HTTPS). | Abrir una sesión en una página
| PATCH | Aplica modificaciones parciales a un recurso en específico.  | Modificar el email de un estudiante
| OPTIONS | Le pregunta al servidor qué metodos tiene disponibles para nosotros para poder utilizarlos; generalmente se responde en los headers, específicamente en el campo "allow". | Hacer solicitudes a un destino desconocido
| TRACE | Hace lo mismo que el comando _tracert_ de la consola. Sigue la ruta que realiza la HTTP Request al servidor y cuando regresa al cliente. | 

## Response codes o status codes y reason phrases o frases de respuesta
Cuando se realizan las solicitudes HTTP, siempre se debe retornar un código de respuesta, que es un código de 3 números que se acompaña de una frase de respuesta, el cuál generalmente nos indica que ha sucedido durante la petición. Se clasifican en rangos, y posteriormente, cada código tiene su frase de respuesta:

1. 100 a 199 (1xx) es de rango de información, quiere decir que algo ha sucedido pero no deberíamos de preocuparnos
2. 200 a 299 (2xx) significa "Successful" o exitoso, es decir, todo ha ido bien en la solicitud
3. 300 a 399 (3xx) significa "Redirection", quiere decir que el recurso cambió de destino, se cambia la solicitud
4. 400 a 499 (4xx) significa "Client error" o error de parte del cliente, y esto regularmente sucede al acceder a recursos inexistentes, o prohibidos (404 y 403 respectivamente).
5. 500 a 599 (5xx) significa "Server error" o error del servidor, esto sucede cuando de parte del servidor ha ocurrido un error inesperado, algo que no quedó en manos del cliente.
   
El protocolo HTTP no define códigos arriba de 599. A continuación, se enlistan algunos más conocidos o usados:

| Código | Significado |
| ------ | ----------- |
| 100 | Continue |
| 102 | Processing |
| 200 | OK |
| 201 | Created |
| 202 | Accepted |
| 204 | No content |
| 301 | Moved permanently |
| 400 | Bad request |
| 403 | Forbidden |
| 404 | Not found |
| 405 | Method not allowed |
| 408 | Request Timeout |
| 429 | Too many requests |
| 500 | Internal server error |
| 502 | Bad gateway |

Dato curioso, existe un código titulado "I'm a teapot", es el 418, y su uso es una broma, pero en realidad puede ser utilizado, generalmente cuando un sitio tiene solicitudes que no quiere responder.

---
### Referencias electrónicas 🌐
https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods 
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status 


https://http.cat/