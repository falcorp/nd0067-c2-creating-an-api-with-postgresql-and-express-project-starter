CREATE TABLE udacityonlinestore.users
(
    id serial NOT NULL,
    "firstName" character(100),
    "lastName" character(100),
    password character(100),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS udacityonlinestore.users
    OWNER to postgres;