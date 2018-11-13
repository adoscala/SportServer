use sistemas;

CREATE TABLE canchas(
    id int not null auto_increment,
    nombre varchar(30),
    coords varchar (20),
    canchas int,
    PRIMARY KEY (id)
);

CREATE TABLE usuarios(
    id int not null auto_increment,
    nombre VARCHAR(30),
    pass VARCHAR(270),
    puntos int,

    PRIMARY key (id)
);

CREATE TABLE reservas(
    id int not null auto_increment,
    idCancha int not null,
    idUsuario int not null,
    fecha varchar(30) not null,

    PRIMARY KEY (id),
    FOREIGN KEY (idCancha) REFERENCES canchas(id),
    FOREIGN key (idUsuario) REFERENCES usuarios(id)
);