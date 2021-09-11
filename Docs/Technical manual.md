# Technical manual

## Content
- [Objectives](#objectives)
- [Architecture](#architecture)
- [IAM users](#iam)
- [Services](#services)
    - [VPCs](#vpc)
    - [EC2](#ec2)
    - [RDS](#rds)
    - [S3](#s3)
    - [Load Balancer](#load-balancer)
- [Conclusions](#conclusions)

## Objectives<a name="objectives"></a>
El motivo fundamental de este documento es brindar el conocimiento de la arquitectura y el análisis de las funcionalidades del sistema, brindando un análisis de las herramientas y servicios utilizados.

## Architecture<a name="architecture"></a>
El estilo arquitectónico para este proyecto es basado en capas el cual nos permite aislar cada una de ellas permitiéndonos aumentar en su escalabilidad horizontal y aislar cada una de ellas en redes VPC proporcionadas por AWS logrando así una mejor integridad y seguridad en los datos del usuario final. 

Poseyendo la siguiente estructura:
- Un bucket para el alojamiento del sitio estático desarrollado en angular.
- Un balanceador de carga permitiéndonos redirigir el trafico a los servidores de una mejor manera.
- Una instancia de base de datos alojada en el servicio RDS de AWS y aislada en una subred privada.
- Un bucket para el almacenamiento de los archivos distribuyendo cada uno por carpeta.

<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631315276/UStorage/ziswcpounfmfr10kbbqa.png" width="400">
    <p align="center">Architecture</p>
</div>

## IAM users<a name="iam"></a>
En los usuarios IAM fue necesario crear dos de tal manera que cada uno solo pudiera acceder a los servicios necesarios mediante su rol:
- El primer usuario que se creo fue un usuario administrador con el identificador `Administrador_201801266`el cual posee los permisos `AdministratorAccess` permitiéndole así administrar cada una de las capas y funcionalidades del proyecto.
- El segundo usuario se creo para poder acceder mediante el SDK de AWS permitiendo poder realizar el trabajo de desarrollo de las funcionalidades del proyecto. Los roles que se le asignaron fueron `AmazonS3FullAccess`.

## Services<a name="services"></a>
### VPCs<a name="vpc"></a>
La creación de las VPCs es necesaria para intercomunicar y aislar cada una de las capas del proyecto permitiéndonos tener acceso público o acceso mediante una conexión privada interna.

Para la creación de la VPC es necesario ingresar a la sección de tus [VPC]( https://us-east-2.console.aws.amazon.com/vpc/home#vpcs:) en la cual tendremos la opción de crear una nueva donde es necesario definirle un nombre, un rango de IPs. Para la arquitectura de nuestro proyecto fue necesario crear 2 subnets públicas y 1 subnet privada esto para cumplir con los requisitos de los siguientes servicios.

<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631318086/UStorage/rapxw6462ab9ygnjbtmt.png" width="400">
    <p align="center">VPC page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631318087/UStorage/ot0qeritrjjvqekyoybn.png" width="400">
    <p align="center">Subnets page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631318222/UStorage/s1gdccerdazw4cklrvtc.png" width="400">
    <p align="center">Create subnets page</p>
</div>

También es necesario activar los DNS hostnames.
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631318879/UStorage/lt55dmf86qp5k2tj2bax.png" width="400">
    <p align="center">Edit DNS Hostnames page</p>
</div>

Por ultimo es necesario crear las tablas de ruteos donde se debe crear una por las subnets publicas y otra por las subnet privada, luego de esto debemos asignar la vpc a un internet gateway.
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631318886/UStorage/uhpd7iywqtzjey20ggqd.png" width="400">
    <p align="center">Route tables page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631318890/UStorage/upcyyrzxu9ba9j769nnl.png" width="400">
    <p align="center">Internet gateways page</p>
</div>

### EC2<a name="ec2"></a>
Para crear una instancia es necesario ingresar a la pagina de [EC2]( https://us-east-2.console.aws.amazon.com/ec2/v2/home#Instances:) donde podremos lanzar nuevas instancias permitiéndonos escoger el sistema, el tipo de instancia, en los detalles de la instancia debemos asignarlas a nuestra vpc y a una de nuestras subnets públicas, almacenamiento, etiquetas y por ultimo configurar el grupo de seguridad donde podremos escoger uno existente o crear uno nuevo en el cual debemos definir los puertos que necesitemos para poder ingresar y realizar peticiones a la misma. Luego de haber realizado cada una de las configuraciones se procede a lanzar donde se nos solicitara escoger o crear un par de llaves para el acceso de esta.
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631319669/UStorage/evk0wn4h8zxvrlo1cf92.png" width="400">
    <p align="center">Instances page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631319706/UStorage/jzhycslpejlka1nivpk3.png" width="400">
    <p align="center">AMI page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631319738/UStorage/gdw2eo5lzlnsbtzaex8w.png" width="400">
    <p align="center">Instance type page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631319793/UStorage/edvjbmaxtkk9qhkdvg5q.png" width="400">
    <p align="center">Instance details page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631319848/UStorage/zq6k8mbs15suwmcjfffn.png" width="400">
    <p align="center">Storage page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631319870/UStorage/gfbi58m567q4iso24j9q.png" width="400">
    <p align="center">Tags page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631319933/UStorage/akyamdvjo5gafg2ujfts.png" width="400">
    <p align="center">Security group page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631319962/UStorage/vdbburombcufit6u1pa9.png" width="400">
    <p align="center">Select key pair page</p>
</div>

### RDS<a name="rds"></a>
Para la creación de nuestra instancia de base de datos se utilizo el servicio [RDS]( https://us-east-2.console.aws.amazon.com/rds/home#databases:) en el cual se escogió una instancia de MySQL con preferencias de capa gratuita, a esta instancia se le agrego la VPC creada anteriormente y se le asigno una contraseña para acceder a ella.
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631324506/UStorage/zarwax3tju0l6owl7ztv.png" width="400">
    <p align="center">RDS page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631324534/UStorage/cwosptwof2pui1wa8gu6.png" width="400">
    <p align="center">Create database page</p>
</div>

### S3<a name="s3"></a>
Para el sistema de almacenamiento se utilizó el servicio [S3]( https://s3.console.aws.amazon.com/s3/home) en el cual se configuraron dos buckets siendo el primero para almacenamiento de los archivos e imágenes y el segundo para el despliegue de la página estática. Cada uno de los buckets se configuraron como públicos.
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631324900/UStorage/qb2sok67eaqs9knp0hjl.png" width="400">
    <p align="center">S3 page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631324921/UStorage/szrpb242mkidnrjzvn2s.png" width="400">
    <p align="center">Create bucket page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631324939/UStorage/ek7t1xyblarcag79mcgj.png" width="400">
    <p align="center">Public access page</p>
</div>

### Load Balancer<a name="load-balancer"></a>
Para la creación del load balancer es necesario entrar a la página de EC2 donde debemos buscar la sección de load balancer, al estar en la sección debemos crear el load balancer pero previamente es necesario crear un security group donde permitamos el acceso de cualquier lado a los puertos necesarios, luego se puede crear el load balancer de tipo clásico donde debemos asignarle el puerto de entrar y el puerto de comunicación con las ec2, también se le configurar el health check y las instancias a asignar.
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631325433/UStorage/eoiksqpfwm9tvptdezyx.png" width="400">
    <p align="center">Load balancer page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631325462/UStorage/vsqbqmbzadkw4f0qftqa.png" width="400">
    <p align="center">Type load balancer page</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1631325499/UStorage/ymk1ab69lbem0xae1ock.png" width="400">
    <p align="center">Bassic configuration page</p>
</div>

## Conclusions<a name="conclusions"></a>
AWS nos permite la elección de varios servicios permitiéndonos poder montar nuestra arquitectura dándonos ventajas como seguridad y escalabilidad. Siendo muy importante en el desarrollo y despliegue de un proyecto. Gracias a su capa gratuita podemos gozar de ciertas características de manera limitada para poder determinar el mejor acoplamiento de nuestro proyecto.