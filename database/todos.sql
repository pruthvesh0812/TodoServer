create schema todos;

create table todolist
	(id INT ,
    todos varchar(500) not null,
    completed_status varchar(20) not null,
    
    primary key (id) );
    
select * from todolist