CREATE TABLE udacityonlinestore.products
(
    id serial NOT NULL,
    name character(100) NOT NULL,
    price double precision NOT NULL,
    category character(100),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS udacityonlinestore.products
    OWNER to postgres;