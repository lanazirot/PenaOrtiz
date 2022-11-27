USE tkd_api
GO

CREATE TABLE Gimnasios(
	id_gimnasio INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	nombre VARCHAR(255) NOT NULL,
	direccion VARCHAR(255) NOT NULL
);

CREATE TABLE Estudiantes(
	id_estudiante INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	nombre VARCHAR(255) NOT NULL,
	direccion VARCHAR(255) NOT NULL,
	peso DECIMAL NOT NULL,
	cinta VARCHAR(20) NOT NULL,
	id_gimnasio INT FOREIGN KEY REFERENCES Gimnasios(id_gimnasio),
	CONSTRAINT ck_estudiante_cinta CHECK (cinta IN('Blanca','Amarilla','Naranja','Verde','Azul','Roja','Negra'))
);