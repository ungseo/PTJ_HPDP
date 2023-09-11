insert into members (login_id, login_pw, created_date, modified_date) values ('admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi',current_time(), current_time());
insert into members (login_id, login_pw, created_date, modified_date) values ('user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',current_time(), current_time());

insert into authority (authority_name) values ('ROLE_USER');
insert into authority (authority_name) values ('ROLE_ADMIN');

insert into user_authority (members_id, authority_name) values (1, 'ROLE_USER');
insert into user_authority (members_id, authority_name) values (1, 'ROLE_ADMIN');
insert into user_authority (members_id, authority_name) values (2, 'ROLE_USER');