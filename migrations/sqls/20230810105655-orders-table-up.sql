CREATE TABLE IF NOT EXISTS udacityonlinestore.orders
(
    id integer NOT NULL DEFAULT nextval('udacityonlinestore.orders_id_seq1'::regclass),
    product_id bigint NOT NULL,
    quantity integer NOT NULL,
    user_id bigint NOT NULL,
    status character(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT orders_pkey1 PRIMARY KEY (id),
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.product (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH FULL
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS udacityonlinestore.orders
    OWNER to postgres;