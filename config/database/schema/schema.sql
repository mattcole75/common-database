drop database if exists `metrolink`;
create database `metrolink`;

use metrolink;

-- ****************************************
-- tram management system database tables *
-- ****************************************
create table tms_version (
    version varchar(10) not null,
    release_date varchar(10) not null,
    obc_version varchar(20) not null,
    type varchar(20) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true -- can this record be used / viewed
);

create table tms_deployment_area (
    id varchar(3) not null unique,
    host varchar(50) not null,
    opc_server_name_site varchar(50) not null,
    opc_server_name_reference varchar(50) not null,
    opc_server_host_site varchar(50) not null,
    opc_server_host_reference varchar(50) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id)
);

create table tms_track_area (
    id varchar(3) not null unique,
    access_bit smallInt not null,
    `name` varchar(50) not null,
    deployment_area_id varchar(3) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_track_area_deployment_area_id foreign key (deployment_area_id) references tms_deployment_area (id)
		    on update cascade on delete cascade
);

create table tms_track_section (
    id int not null unique,
    track_area_id varchar(3) not null,
    super_track varchar(4) not null,
    wall_track varchar(4) not null,
    new_wall_track varchar(4) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_track_section_track_area_id foreign key (track_area_id) references tms_track_area (id)
		    on update cascade on delete cascade
);

create table tms_track_section_detector_pair (
    id int not null auto_increment,
    track_section_id int not null,
    entry varchar(5) not null,
    `exit` varchar(5) not null,
    association varchar(50) null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_track_section_detector_pair_track_section_id foreign key (track_section_id) references tms_track_section (id)
		    on update cascade on delete cascade
);

create table tms_conflict_monitor (
    id varchar(3) not null unique,
    in_service boolean not null,
    track_area_id varchar(3) not null,
    earped boolean not null,
    description varchar(50),
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_conflict_monitor_track_area_id foreign key (track_area_id) references tms_track_area (id)
		    on update cascade on delete cascade
);

create table tms_local_controller (
    uid int not null,
    id varchar(3) not null unique,
    in_service boolean not null,
    track_area_id varchar(3) not null,
    reference_ip_address int unsigned not null,
    site_ip_address int unsigned not null,
    port_number smallInt not null,
    description varchar(50) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_local_controller_track_area_id foreign key (track_area_id) references tms_track_area (id)
		    on update cascade on delete cascade
);

create table tms_tram (
    id smallInt not null unique,
    reference_ip_address int unsigned not null,
    site_ip_address int unsigned not null,
    `status` varchar(50) not null, 
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id)
);

create table tms_point (
    id varchar(6) not null unique,
    type varchar(50) not null,
    direction varchar(50) not null,
    normal_position varchar(50) not null,
    normal_position_timeout smallInt not null,
    route_blocking_disabled boolean not null,
    teml_41 boolean not null,
    local_controller_id varchar(3) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_point_local_controller_id foreign key (local_controller_id) references tms_local_controller (id)
		    on update cascade on delete cascade
);

create table tms_network_section (
    name varchar(50) unique,
    created datetime not null default now(),
    updated datetime not null default now() on update now(),
    inuse boolean not null default true,
    primary key (name)
);

create table tms_geographical_area (
    id smallInt not null,
    network_section_name varchar(50) not null,
    name varchar(50) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_geographical_area_network_section_name foreign key (network_section_name) references tms_network_section (name)
		    on update cascade on delete cascade
);

create table tms_signal (
    id varchar(6) not null unique,
    direction varchar(50) not null,
    geographical_area_id smallInt not null,
    local_controller_id varchar(3) not null,
    conflict_monitor_id varchar(3) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_signal_geographical_area_id foreign key (geographical_area_id) references tms_geographical_area (id)
		    on update cascade on delete cascade,
    constraint fk_signal_conflict_monitor_id foreign key (conflict_monitor_id) references tms_conflict_monitor (id)
		    on update cascade on delete cascade,
    constraint fk_signal_local_controller_id foreign key (local_controller_id) references tms_local_controller (id)
		    on update cascade on delete cascade
);

create table tms_chain (
    id varchar(3) not null unique,
    name varchar(100) not null,
    direction varchar(50) null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id)
);

create table tms_detector (
    id int not null auto_increment,
    detector_id int not null,
    equipment_number varchar(5) not null unique,
    chain_id varchar(3) not null,
    type varchar(50) not null,
    used_by varchar(50) not null,
    primary_controller_id varchar(3) not null,
    rts_enabled boolean not null,
    critial_loop boolean not null,
    distance decimal(7,1) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_detector_local_controller_id foreign key (primary_controller_id) references tms_local_controller (id)
		    on update cascade on delete cascade
);

create table tms_chain_link (
    id int not null auto_increment,
    entry_detector_equipment_number varchar(5) not null,
    exit_detector_equipment_number varchar(5) not null,
    distance decimal(7,1) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_chain_link_entry_detector_equipment_number foreign key (entry_detector_equipment_number) references tms_detector (equipment_number)
		    on update cascade on delete cascade,
    constraint fk_chain_link_exit_detector_equipment_number foreign key (exit_detector_equipment_number) references tms_detector (equipment_number)
		    on update cascade on delete cascade
);

create table tms_spas_zone (
    id varchar(6) not null unique,
    local_controller_id varchar(3) not null,
    conflict_monitor_id varchar(3) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_spas_zone_conflict_monitor_id foreign key (conflict_monitor_id) references tms_conflict_monitor (id)
		    on update cascade on delete cascade,
    constraint fk_spas_zone_local_controller_id foreign key (local_controller_id) references tms_local_controller (id)
		    on update cascade on delete cascade
);

create table tms_mass_detector (
    id varchar(10) not null unique,
    local_controller_id varchar(3) not null,
    conflict_monitor_id varchar(3) null,
    associated_spas_zone_id varchar(6) null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_mass_detector_associated_spas_zone_id foreign key (associated_spas_zone_id) references tms_spas_zone (id)
		    on update cascade on delete cascade,
    constraint fk_mass_detector_conflict_monitor_id foreign key (conflict_monitor_id) references tms_conflict_monitor (id)
		    on update cascade on delete cascade,
    constraint fk_mass_detector_local_controller_id foreign key (local_controller_id) references tms_local_controller (id)
		    on update cascade on delete cascade
);

create table tms_axle_counter (
    id varchar(9) not null unique,
    type varchar(50) not null,
    associated_spas_zone_id varchar(6) null,
    local_controller_id varchar(3) not null,
    conflict_monitor_id varchar(3) null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_axle_counters_associated_spas_zone_id foreign key (associated_spas_zone_id) references tms_spas_zone (id)
		    on update cascade on delete cascade,
    constraint fk_axle_counter_conflict_monitor_id foreign key (conflict_monitor_id) references tms_conflict_monitor (id)
		    on update cascade on delete cascade,
    constraint fk_axle_counter_local_controller_id foreign key (local_controller_id) references tms_local_controller (id)
		    on update cascade on delete cascade
);

create table tms_stop (
    id smallInt not null unique,
    atco_code varchar(11) not null unique,
    name varchar(50) not null,
    short_name varchar(50) not null,
    tla varchar(3) not null,
    terminus boolean not null,
    layover_time smallInt not null,
    geographical_area_id smallInt not null,
    local_controller_id varchar(3) not null,
    type varchar(50) not null,
    preferred_platform varchar(50) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_stop_geographical_area_id foreign key (geographical_area_id) references tms_geographical_area (id)
		    on update cascade on delete cascade,
    constraint fk_stop_local_controller_id foreign key (local_controller_id) references tms_local_controller (id)
		    on update cascade on delete cascade
);

create table tms_platform (
    stop_id smallInt not null,
    platform_id tinyInt not null,
    name varchar(50) not null,
    direction varchar(50) not null,
    queue_type varchar(50) not null,
    queue_direction varchar(50) not null,
    dwell_time smallInt not null,
    stabling boolean not null,
    vt_loop varchar(5) null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (stop_id, platform_id),
    constraint fk_platform_stop_id foreign key (stop_id) references tms_stop (id)
		    on update cascade on delete cascade
);

create table tms_line (
    line_number smallInt not null unique,
    name varchar(50) not null,
    display_id varchar(2) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (line_number)
);

create table tms_route_section (
    route_code smallInt not null,
    line_number smallInt not null,
    name varchar(50) not null,
    destination_stop_id smallInt not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (route_code, line_number),
    constraint fk_route_section_line_number foreign key (line_number) references tms_line (line_number)
		    on update cascade on delete cascade,
    constraint fk_route_section_destination_stop_id foreign key (destination_stop_id) references tms_stop (id)
		    on update cascade on delete cascade
);

create table tms_route_section_link (
    id varchar(20) not null,
    route_code smallInt not null,
    line_number smallInt not null,
    sequence smallInt not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id, route_code, line_number),
    constraint fk_route_section_link_line_number foreign key (line_number) references tms_line (line_number)
		    on update cascade on delete cascade,
    constraint fk_route_section_link_route_code foreign key (route_code) references tms_route_section (route_code)
		    on update cascade on delete cascade
);

create table tms_route_link (
    id varchar(20) not null,
    direction varchar(50) not null,
    transit_time smallInt not null,
    from_stop_id smallInt not null,
    to_stop_id smallInt not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_route_link_from_stop_id foreign key (from_stop_id) references tms_stop (id)
		    on update cascade on delete cascade,
    constraint fk_route_link_to_stop_id foreign key (to_stop_id) references tms_stop (id)
		    on update cascade on delete cascade
);

create table tms_route_link_detector_sequence (
    id int not null auto_increment,
    route_link_id varchar(20) not null,
    sequence smallInt not null,
    detector varchar(6) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_route_link_detector_sequence_route_link_id foreign key (route_link_id) references tms_route_link (id)
		    on update cascade on delete cascade
);

create table tms_route_link_detector_at_stop (
    id int not null auto_increment,
    route_link_id varchar(20) not null,
    detector varchar(6),
    platform_id tinyInt not null,
    trigger_association varchar(50) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_route_link_detector_at_stop_route_link_id foreign key (route_link_id) references tms_route_link (id)
		    on update cascade on delete cascade
);

create table tms_route_link_detector_depart (
    id int not null auto_increment,
    route_link_id varchar(20) not null,
    detector varchar(6),
    platform_id tinyInt not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_route_link_detector_depart_route_link_id foreign key (route_link_id) references tms_route_link (id)
		    on update cascade on delete cascade
);

create table tms_route_link_detector_approach (
    id int not null auto_increment,
    route_link_id varchar(20) not null,
    detector varchar(6),
    platform_id tinyInt not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_route_link_detector_approach_route_link_id foreign key (route_link_id) references tms_route_link (id)
		    on update cascade on delete cascade
);

create table tms_route_link_detector_arrive (
    id int not null auto_increment,
    route_link_id varchar(20) not null,
    detector varchar(6),
    platform_id tinyInt not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_route_link_detector_arrive_route_link_id foreign key (route_link_id) references tms_route_link (id)
		    on update cascade on delete cascade
);

create table tms_physical_loop (
    id int not null auto_increment,
    local_controller_id varchar(3) not null, 
    loop_number int not null, 
    detector_equipment_number varchar(5) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_detector_loop_local_controller_id foreign key (local_controller_id) references tms_local_controller (id) on update cascade on delete cascade
    -- constraint fk_detector_loop_detector_equipment_number foreign key (detector_equipment_number) references tms_detector (equipment_number) on update cascade on delete cascade
);

-- ******************************
-- transXchange database tables *
-- ******************************

-- tXc Stops
create table txc_stop (
    stop_point_ref varchar(11) not null unique,
    common_name varchar(50) not null,
    tla varchar(3) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (stop_point_ref)
);

-- tXc Operators
create table txc_operator (
    id varchar(2) not null unique,
    code varchar(3) not null unique,
    name varchar(50) not null unique,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id)
);

-- tXc Operator Garages
create table txc_garage (
    code varchar(3) not null unique,
    operator_id varchar(2) not null,
    name varchar(50) not null,
    primary key (code),
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    constraint fk_txc_garage_operator_id foreign key (operator_id) references txc_operator (id) on update cascade on delete cascade
);

-- tXc Route Sections
create table txc_route_section (
    id varchar(7) not null,
    route_link_id varchar(10) not null unique,
    from_stop_point_ref varchar(11) not null,
    to_stop_point_ref varchar(11) not null,
    direction varchar(50) not null,
    primary key (id, route_link_id),
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true -- can this record be used / viewed
);

-- tXc Routes
create table txc_route (
    id varchar(10) not null unique,
    private_code varchar(3) not null,
    description varchar(100) not null,
    route_section_ref varchar(7) not null,
    line_number smallInt not null,
    route_code smallInt not null,
    primary key (id),
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    constraint fk_txc_route_route_section_ref foreign key (route_section_ref) references txc_route_section (id) on update cascade on delete cascade,
    constraint fk_txc_route_line_number foreign key (line_number) references tms_line (line_number) on update cascade on delete cascade,
    constraint fk_txc_route_route_number foreign key (route_code) references tms_route_section (route_code) on update cascade on delete cascade
);

-- tXc Journey PatternSequence
create table txc_journey_pattern_section (
    id varchar(5) not null,
    timing_link_id varchar(10) not null,
    from_id varchar(8) not null,
    from_sequence_number smallInt not null,
    from_stop_point_ref varchar(11) not null,
    from_timing_status varchar(3) not null,
    to_id varchar(8) not null,
    to_sequence_number smallInt not null,
    to_stop_point_ref varchar(11) not null,
    to_timing_status varchar(3) not null,
    route_link_ref varchar(10) not null,
    run_time smallInt not null,
    primary key (id, timing_link_id),
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    constraint fk_txc_journey_pattern_section_route_link_ref foreign key (route_link_ref) references txc_route_section (route_link_id) on update cascade on delete cascade
);

-- tXc Services
create table txc_service (
    code smallInt not null unique,
    line_id varchar(3) not null,
    line_ref smallInt not null,
    start_date date not null,
    operator_ref varchar(2) not null,
    direction varchar(50) not null,
    origin varchar(50) not null,
    destination varchar(50) not null,
    primary key (code),
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    constraint fk_txc_service_operator_ref foreign key (operator_ref) references txc_operator (id) on update cascade on delete cascade
);

-- txc service  journey pattern
create table txc_service_journey_pattern (
    service_code smallInt not null,
    journey_pattern_id varchar(6) not null unique,
    direction varchar(50) not null,
    route_ref varchar(10) not null,
    journey_pattern_section_ref varchar(5) not null,
    primary key (service_code, journey_pattern_id),
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    constraint fk_txc_service_journey_pattern_route_ref foreign key (route_ref) references txc_route (id) on update cascade on delete cascade,
    constraint fk_txc_service_journey_pattern_journey_pattern_section_ref foreign key (journey_pattern_section_ref) references txc_journey_pattern_section (id) on update cascade on delete cascade
);

-- txc vehicle Journey
create table txc_vehicle_journey (
    sequence smallInt not null,
    block varchar(10) not null,
    block_number smallInt not null,
    ticket_journey_code varchar(10) not null,
    vehicle_journey_code varchar(6) not null,
    service_ref smallInt not null,
    line_ref varchar(3) not null,
    service_journey_pattern_ref varchar(6) not null,
    dead_run_id varchar(10) null,
    dead_run_positioning_link_id varchar(12) null,
    dead_run_time smallInt null,
    from_garage varchar(3) null,
    to_stop_point_ref varchar(11) null,
    departure_time time not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (sequence),
    constraint fk_txc_vehicle_journey_service_ref foreign key (service_ref) references txc_service (code) on update cascade on delete cascade,
    constraint fk_txc_vehicle_journey_service_journey_pattern_ref foreign key (service_journey_pattern_ref) references txc_service_journey_pattern (journey_pattern_id) on update cascade on delete cascade,
    constraint fk_txc_vehicle_journey_from_garage foreign key (from_garage) references txc_garage (code) on update cascade on delete cascade,
    constraint fk_txc_vehicle_journey_to_stop_point_ref foreign key (to_stop_point_ref) references txc_stop (stop_point_ref) on update cascade on delete cascade
);

-- *****************************
-- application database tables *
-- *****************************
create table rm_point_machine_swing_time (
    id int not null auto_increment,
    point_ref varchar(6) not null,
    direction varchar(16), -- Point Set Right or Point Set Left
    swing_time smallInt not null,
    tms_timestamp timestamp(3) not null,
    created timestamp(3) not null default now(3), -- when was this record created
    updated timestamp(3) not null default now(3) on update now(3), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_rm_point_machine_swing_time_point_ref foreign key (point_ref) references tms_point (id) on update cascade on delete cascade
);

create table metrolink_live (
    tram_id smallInt not null,
    area varchar(3) not null,
    line_number smallInt not null,
    route_code smallInt not null,
    `loop` smallInt not null,
    `date` date not null,
    timestamp time(6) not null,
    event varchar(50) not null,
    created datetime not null default now(),
        constraint fk_metrolink_live_tram_id foreign key (tram_id) references tms_tram (id)
            on update cascade on delete cascade
        -- constraint fk_metrolinkLiveLineNumber foreign key (lineNumber) references tmsLine (lineNumber)
        --     on update cascade on delete cascade,
        -- constraint fk_metrolinkLiveRouteID foreign key (routeCode) references tmsRouteSection (routeCode)
        --     on update cascade on delete cascade
);

-- *******************************
-- application stored procedures *
-- *******************************
-- application Stored Procedures
delimiter //
create procedure sp_insert_point_machine_swing_time (in p_point_ref varchar(6), p_direction varchar(16), p_swing_time smallInt, p_tms_timestamp timestamp(3), out insertId int)
    begin
        insert into rm_point_machine_swing_time (point_ref, direction, swing_time, tms_timestamp)
        values (p_point_ref, p_direction, p_swing_time, p_tms_timestamp);

        set insertId := last_insert_id();
        select insertId;
    end//

create procedure sp_select_point_machine_swing_times (in p_point_ref varchar(6), p_start_date timestamp, p_end_date timestamp)
    begin
        select id, point_ref, direction, swing_time, tms_timestamp
        from rm_point_machine_swing_time 
        where point_ref = p_point_ref
        and tms_timestamp between p_start_date and p_end_date
        order by tms_timestamp asc;
    end//

delimiter ;