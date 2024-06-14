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

create table tms_points_machine (
    id varchar(6) not null unique,
    type varchar(50) not null,
    turnout varchar(50) not null,
    normal_position varchar(50) not null,
    normal_position_timeout smallInt not null,
    route_blocking_disabled boolean not null,
    teml_41 boolean not null,
    local_controller_id varchar(3) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    fulltext key text (id, turnout),
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

create table txc_stop (
    stop_point_ref varchar(11) not null unique,
    common_name varchar(50) not null,
    tla varchar(3) not null,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (stop_point_ref)
);

create table txc_operator (
    id varchar(2) not null unique,
    code varchar(3) not null unique,
    name varchar(50) not null unique,
    created timestamp not null default now(), -- when was this record created
    updated timestamp not null default now() on update now(), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id)
);

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
create table railmon_points_machine_swing_time (
    id smallInt not null auto_increment,
    points_machine_ref varchar(6) not null, -- reference to the tms points machine table
    direction varchar(32), -- Points Set Right or Points Set Left
    swing_time mediumInt not null, -- the time in milliseconds it takes to loose detection and then gain detection
    tms_timestamp timestamp(3) not null, -- the source timestamp
    created timestamp(3) not null default now(3), -- when was this record created
    updated timestamp(3) not null default now(3) on update now(3), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    primary key (id),
    constraint fk_railmon_points_machine_swing_time_points_machine_ref foreign key (points_machine_ref) references tms_points_machine (id)
		on update cascade on delete cascade
);

create table railmon_points_machine_performance (
    id varchar(6) not null, -- reference to the tms points machine table
    swing_time_safety_limit smallInt null, -- the machine's safety limit
    
    left_swing_time_avg float null, -- left swing time average (mean value over last year)
	left_swing_time_standard_deviation float null, -- left swing time standard deviation (stdev over last year)
	left_swing_time_current_avg float null, -- left swing time average (last hour)
    
    left_swing_time_measurement_mode varchar(2) generated always as -- IS = In Specification OS = Out of Specification
		(
			case
				when (left_swing_time_avg >= (swing_time_safety_limit - (left_swing_time_standard_deviation * 4))) then
					'OS'
				when (left_swing_time_avg < (swing_time_safety_limit - (left_swing_time_standard_deviation * 4))) then
					'IS'
			end
		),
	left_swing_time_performance_status varchar(32) generated always as -- the performance status = Safety limit exeeded, Immediate Action, Action, Monitor, OK
		(
			case
				when (left_swing_time_avg >= (swing_time_safety_limit - (left_swing_time_standard_deviation * 4))) then
					case 
						when (left_swing_time_current_avg >= swing_time_safety_limit) then
							'Safety Limit Exceeded'
						when (left_swing_time_current_avg >= (swing_time_safety_limit - left_swing_time_standard_deviation) and left_swing_time_current_avg < swing_time_safety_limit) then
							'Immediate Action'
						when (left_swing_time_current_avg >= (swing_time_safety_limit - (left_swing_time_standard_deviation * 2)) && left_swing_time_current_avg < (swing_time_safety_limit - left_swing_time_standard_deviation)) then
							'Action'
						when (left_swing_time_current_avg >= (swing_time_safety_limit - (left_swing_time_standard_deviation * 3)) && left_swing_time_current_avg < (swing_time_safety_limit - (left_swing_time_standard_deviation * 2))) then
							'Monitor'
						when (left_swing_time_current_avg >= (swing_time_safety_limit - (left_swing_time_standard_deviation * 4)) && left_swing_time_current_avg < (swing_time_safety_limit - (left_swing_time_standard_deviation * 3))) then
							'OK'
						when (left_swing_time_current_avg < (swing_time_safety_limit - (left_swing_time_standard_deviation * 4))) then
							'OK'
					end
				when (left_swing_time_avg < (swing_time_safety_limit - (left_swing_time_standard_deviation * 4))) then
					case 
						when (left_swing_time_current_avg >= left_swing_time_avg + (left_swing_time_standard_deviation * 4)) then
							'Immediate Action'
						when (left_swing_time_current_avg >= (left_swing_time_avg + (left_swing_time_standard_deviation * 3)) && left_swing_time_current_avg < (left_swing_time_avg + (left_swing_time_standard_deviation * 4))) then
							'Action'
						when (left_swing_time_current_avg >= (left_swing_time_avg + (left_swing_time_standard_deviation * 2)) && left_swing_time_current_avg < (left_swing_time_avg + (left_swing_time_standard_deviation * 3))) then
							'Monitor'
						when (left_swing_time_current_avg >= (left_swing_time_avg + left_swing_time_standard_deviation) && left_swing_time_current_avg < (left_swing_time_avg + (left_swing_time_standard_deviation * 2))) then
							'OK'
						when (left_swing_time_current_avg >= left_swing_time_avg && left_swing_time_current_avg < (left_swing_time_avg + left_swing_time_standard_deviation)) then
							'OK'
						when (left_swing_time_current_avg < left_swing_time_avg) then
							'OK'
					end
			end
        ),
        
	right_swing_time_avg float null, -- right swing time average (mean value over last year)
	right_swing_time_standard_deviation float null, -- right swing time standard deviation (stdev over last year)
	right_swing_time_current_avg float null, -- right swing time average (last hour)
    
    right_swing_time_measurement_mode varchar(2) generated always as -- IS = In Specification OS = Out of Specification
		(
			case
				when (right_swing_time_avg >= (swing_time_safety_limit - (right_swing_time_standard_deviation * 4))) then
					'OS'
				when (right_swing_time_avg < (swing_time_safety_limit - (right_swing_time_standard_deviation * 4))) then
					'IS'
			end
		),
	
    right_swing_time_performance_status varchar(32) generated always as -- the performance status = Safety limit exeeded, Immediate Action, Action, Monitor, OK
		(
			case
				when (right_swing_time_avg >= (swing_time_safety_limit - (right_swing_time_standard_deviation * 4))) then
					case 
						when (right_swing_time_current_avg >= swing_time_safety_limit) then
							'Safety Limit Exceeded'
						when (right_swing_time_current_avg >= (swing_time_safety_limit - right_swing_time_standard_deviation) and right_swing_time_current_avg < swing_time_safety_limit) then
							'Immediate Action'
						when (right_swing_time_current_avg >= (swing_time_safety_limit - (right_swing_time_standard_deviation * 2)) && right_swing_time_current_avg < (swing_time_safety_limit - right_swing_time_standard_deviation)) then
							'Action'
						when (right_swing_time_current_avg >= (swing_time_safety_limit - (right_swing_time_standard_deviation * 3)) && right_swing_time_current_avg < (swing_time_safety_limit - (right_swing_time_standard_deviation * 2))) then
							'Monitor'
						when (right_swing_time_current_avg >= (swing_time_safety_limit - (right_swing_time_standard_deviation * 4)) && right_swing_time_current_avg < (swing_time_safety_limit - (right_swing_time_standard_deviation * 3))) then
							'OK'
						when (right_swing_time_current_avg < (swing_time_safety_limit - (right_swing_time_standard_deviation * 4))) then
							'OK'
					end
				when (right_swing_time_avg < (swing_time_safety_limit - (right_swing_time_standard_deviation * 4))) then
					case 
						when (right_swing_time_current_avg >= left_swing_time_avg + (right_swing_time_standard_deviation * 4)) then
							'Immediate Action'
						when (right_swing_time_current_avg >= (right_swing_time_avg + (right_swing_time_standard_deviation * 3)) && right_swing_time_current_avg < (right_swing_time_avg + (right_swing_time_standard_deviation * 4))) then
							'Action'
						when (right_swing_time_current_avg >= (right_swing_time_avg + (right_swing_time_standard_deviation * 2)) && right_swing_time_current_avg < (right_swing_time_avg + (right_swing_time_standard_deviation * 3))) then
							'Monitor'
						when (right_swing_time_current_avg >= (right_swing_time_avg + right_swing_time_standard_deviation) && right_swing_time_current_avg < (right_swing_time_avg + (right_swing_time_standard_deviation * 2))) then
							'OK'
						when (right_swing_time_current_avg >= right_swing_time_avg && right_swing_time_current_avg < (right_swing_time_avg + right_swing_time_standard_deviation)) then
							'OK'
						when (right_swing_time_current_avg < right_swing_time_avg) then
							'OK'
					end
			end
        ),
    
    created timestamp(3) not null default now(3), -- when was this record created
    updated timestamp(3) not null default now(3) on update now(3), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    
    primary key (id),
    constraint fk_railmon_points_machine_performance_id foreign key (id) references tms_points_machine (id)
		on update cascade on delete cascade
);

create table railmon_sensor_monitoring_point (
	id int not null auto_increment,
    name varchar(64) not null unique, -- the name of the monitoring point
    area varchar(64) not null, -- the area the sensor can be found
    -- location json null, -- the location json value for the map interface
    
    created timestamp(3) not null default now(3), -- when was this record created
    updated timestamp(3) not null default now(3) on update now(3), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    
    primary key (id),
    fulltext key text (name, area)
);

create table railmon_sensor (
	id int not null auto_increment,
    railmon_sensor_monitoring_point_ref int not null,
	prev_id_ref varchar(64) null, -- the id reference from the earlier database
    name varchar(64) not null, -- the name of the sensor
    department varchar(64) not null, -- the technical department carrying out the monitoring
    `system` varchar(64) not null, -- the system being monitored
    `type` varchar(64) not null, -- what type of sensor is it
    purpose varchar(64) not null, -- what purpose does this sensor serve
    -- location json not null, -- the location json value for the map interface
    upper_threshold int null, -- the upper sensor value threshold
    lower_threshold int null, -- the lower sensor value threshold
    calibration_date date null, -- date the sensor was calibrated
    calibration_valid_weeks smallInt null, -- how many weeks in the calibration valid for
    calibration_cert_url varchar(256) null, -- the url to the calibration cert
    installed_date date null, -- the date the sensor was installed
    commissioned_date date null, -- the date the sensor was commissioned
    uninstalled_date date null, -- the date the sensor was uninstalled
    `status` varchar(64) not null, -- the status of the sensor
    
    created timestamp(3) not null default now(3), -- when was this record created
    updated timestamp(3) not null default now(3) on update now(3), -- when was the last time this record was updated
    inuse boolean not null default true, -- can this record be used / viewed
    
    primary key (id),
    fulltext key text (name, department, `system`, `type`),
    constraint fk_railmon_sensor_monitoring_point_ref foreign key (railmon_sensor_monitoring_point_ref) references railmon_sensor_monitoring_point (id)
		on update cascade on delete cascade
);

-- ***********************************
-- configuration tables *
-- ***********************************
create table config_points_controller (
    id varchar(8) not null,
    type varchar(24) not null, -- manufacturer
    modification_description varchar(256) null,
    comms_type varchar(16) not null,
    plc_serial_number varchar(32) not null,
    plc_firmware_version varchar(16) not null,
    comments varchar(256) null,
    primary key (id)
);

create table config_points_machine (
    id varchar(6) not null, -- the point machine identity
    points_controller_ref varchar(16) null, -- the reference to the point controller
    direction varchar(32) not null, -- 
    switch_type varchar(32) not null,
    rail_type varchar(32) not null,
    track_form varchar(32) not null,
    maintenance_guage smallInt null, -- MTG 1432
    free_wheel_clearance tinyInt null, -- FWC
    free_wheel_passage tinyInt null, -- FWP
    open_switch tinyInt null, -- OS
    machine_type varchar(64) not null,
    points_configuration varchar(64) not null,
    points_position_indicator_present varchar(32) not null,
    points_position_indicator_shows_left varchar(32) not null,
    points_position_indicator_shows_right varchar(32) not null,
    points_barable varchar(32) not null,
    points_handle_present varchar(128) not null,
    hand_operated_by_driver varchar(32) not null,
    trailable_5mph varchar(32) not null,
    operation_restrictions varchar(256) null,
    operation_procedure varchar(256) null,
    swing_time_safety_limit smallInt null, -- safety limit in milliseconds
    motor_drive_timeout smallInt null, -- drive timeout in milliseconds
    notes varchar(512) null,
    primary key (id),
    constraint fk_config_points_machine_point_machine foreign key (id) references tms_points_machine (id)
		on update cascade on delete cascade
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

delimiter //
-- *******************************
-- application stored procedures *
-- *******************************
create procedure sp_insert_points_machine_swing_time (in p_points_machine_ref varchar(6), p_direction varchar(32), p_swing_time mediumInt, p_tms_timestamp timestamp(3), out insertId int)
    begin
        insert into railmon_points_machine_swing_time (points_machine_ref, direction, swing_time, tms_timestamp)
        values (p_points_machine_ref, p_direction, p_swing_time, p_tms_timestamp);

        set insertId := last_insert_id();
        select insertId;
    end//

create procedure sp_select_points_machine_swing_times (in p_points_machine_ref varchar(6), p_start_date timestamp, p_end_date timestamp)
    begin
        select id, points_machine_ref, direction, swing_time, tms_timestamp
        from railmon_points_machine_swing_time
        where points_machine_ref = p_points_machine_ref
        and tms_timestamp between p_start_date and p_end_date
        order by tms_timestamp asc;
    end;//

create procedure sp_select_monitored_points_machines (in searchText varchar(64))
	begin
		if(searchText <> '') then
			select
				a.id,
				a.turnout,
                b.swing_time_safety_limit,
				b.left_swing_time_avg,
				b.left_swing_time_standard_deviation,
				b.left_swing_time_current_avg,
                b.left_swing_time_measurement_mode,
                b.left_swing_time_performance_status,
				b.right_swing_time_avg,
				b.right_swing_time_standard_deviation,
				b.right_swing_time_current_avg,
                b.right_swing_time_measurement_mode,
                b.right_swing_time_performance_status
			from tms_points_machine a
			inner join railmon_points_machine_performance b on a.id = b.id
			where a.inuse = 1
			and match(a.id, a.turnout) against(searchText in boolean mode)
			order by
				FIELD(left_swing_time_performance_status,'Safety Limit Exceeded', 'Immediate Action', 'Action', 'Monitor', 'OK'),
                FIELD(right_swing_time_performance_status,'Safety Limit Exceeded', 'Immediate Action', 'Action', 'Monitor', 'OK'),
                a.id;
		else
			select
				a.id,
				a.turnout,
                b.swing_time_safety_limit,
				b.left_swing_time_avg,
				b.left_swing_time_standard_deviation,
				b.left_swing_time_current_avg,
                b.left_swing_time_measurement_mode,
                b.left_swing_time_performance_status,
				b.right_swing_time_avg,
				b.right_swing_time_standard_deviation,
				b.right_swing_time_current_avg,
                b.right_swing_time_measurement_mode,
                b.right_swing_time_performance_status
			from tms_points_machine a
			inner join railmon_points_machine_performance b on a.id = b.id
			where a.inuse = 1
			order by
				FIELD(left_swing_time_performance_status,'Safety Limit Exceeded', 'Immediate Action', 'Action', 'Monitor', 'OK'),
                FIELD(right_swing_time_performance_status,'Safety Limit Exceeded', 'Immediate Action', 'Action', 'Monitor', 'OK'),
                a.id;
		end if;
	end;//

create procedure sp_select_points_machine (in p_id varchar(6))
	begin
		select a.id, a.type, a.turnout, a.normal_position, a.created, a.updated, a.inuse,
			b.points_controller_ref, b.direction, b.switch_type, b.rail_type, b.track_form,
			b.maintenance_guage, b.free_wheel_clearance, b.free_wheel_passage, b.open_switch,
			b.machine_type, b.points_configuration, b.points_position_indicator_present,
            b.points_position_indicator_shows_left, b.points_position_indicator_shows_right,
			b.points_barable, b.points_handle_present, b.hand_operated_by_driver, b.trailable_5mph, b.operation_restrictions,
			b.operation_procedure, b.swing_time_safety_limit, b.motor_drive_timeout, b.notes,
            c.left_swing_time_avg, c.left_swing_time_standard_deviation, c.left_swing_time_current_avg,
			c.left_swing_time_measurement_mode, c.left_swing_time_performance_status, c.right_swing_time_avg,
			c.right_swing_time_standard_deviation, c.right_swing_time_current_avg, c.right_swing_time_measurement_mode, c.right_swing_time_performance_status
		from tms_points_machine a
		inner join config_points_machine b on a.id = b.id
        left outer join railmon_points_machine_performance c on a.id = c.id
		where a.id = p_id;
    end; //
    
create procedure sp_calculate_avg_points_swing_time (in p_points_machine_ref varchar(6), p_direction varchar(32))
	begin
		declare l_total_avg float default 0;
		
		set l_total_avg = (	select avg(swing_time)
							from railmon_points_machine_swing_time
							where tms_timestamp > (now() - interval 1 year)
							and points_machine_ref = p_points_machine_ref
							and direction = p_direction);
							
		if(p_direction = 'Points Set Left') then
			insert into railmon_points_machine_performance
				(id, left_swing_time_avg)
			values
				(p_points_machine_ref, l_total_avg)
			on duplicate key update
				left_swing_time_avg = l_total_avg;
		else
			insert into railmon_points_machine_performance
				(id, right_swing_time_avg)
			values
				(p_points_machine_ref, l_total_avg)
			on duplicate key update
				right_swing_time_avg = l_total_avg;
		end if;
	end;//

create procedure sp_calculate_std_deviation_points_swing_time (in p_points_machine_ref varchar(6), p_direction varchar(32))
	begin
		declare l_total_stddev float default 0;
		set l_total_stddev = (	select stddev(swing_time)
								from railmon_points_machine_swing_time
								where tms_timestamp > (now() - interval 1 year)
								and points_machine_ref = p_points_machine_ref
								and direction = p_direction);
								
		if(p_direction = 'Points Set Left') then
			insert into railmon_points_machine_performance
				(id, left_swing_time_standard_deviation)
			values
				(p_points_machine_ref, l_total_stddev)
			on duplicate key update
				left_swing_time_standard_deviation = l_total_stddev;
		else
			insert into railmon_points_machine_performance
				(id, right_swing_time_standard_deviation)
			values
				(p_points_machine_ref, l_total_stddev)
			on duplicate key update
				right_swing_time_standard_deviation = l_total_stddev;
		end if;
	end;//

create procedure sp_calculate_current_avg_points_machine_swing_time (in p_points_machine_ref varchar(6), p_direction varchar(32))
	begin
			declare l_last_n_avg float default 0;
            declare l_swing_time_safety_limit smallInt default 0;
            
            set l_last_n_avg = (	select avg(swing_time)
									from (select swing_time
											from railmon_points_machine_swing_time
											where  points_machine_ref = p_points_machine_ref
											and direction = p_direction
											order by tms_timestamp desc 
											limit 10)q);
			set l_swing_time_safety_limit = (select swing_time_safety_limit from config_points_machine where id = p_points_machine_ref);
			
                                    
			if(p_direction = 'Points Set Left') then
				insert into railmon_points_machine_performance
					(id, left_swing_time_current_avg, swing_time_safety_limit)
				values
					(p_points_machine_ref, l_last_n_avg, l_swing_time_safety_limit)
				on duplicate key update
					left_swing_time_current_avg = l_last_n_avg,
                    swing_time_safety_limit = l_swing_time_safety_limit;
			else
				insert into railmon_points_machine_performance
					(id, right_swing_time_current_avg, swing_time_safety_limit)
				values
					(p_points_machine_ref, l_last_n_avg, l_swing_time_safety_limit)
				on duplicate key update
					right_swing_time_current_avg = l_last_n_avg,
                    swing_time_safety_limit = l_swing_time_safety_limit;
            end if;
        end;//

create procedure sp_insert_sensor_monitoring_point (in p_name varchar(64), p_area varchar(64), out insertId int)
    begin
        insert into railmon_sensor_monitoring_point (name, area)
        values (p_name, p_area);

        set insertId := last_insert_id();
        select insertId;
    end//

create procedure sp_select_sensor_monitoring_points (in searchText varchar(64))
	begin
		if(searchText <> '') then
			select id, name, area from railmon_sensor_monitoring_point where inuse = 1
			and match(name, area) against(searchText in boolean mode)
            order by area;
        else
			select id, name, area from railmon_sensor_monitoring_point where inuse = 1 order by area;
        end if;
    end//

create procedure sp_select_sensor_monitoring_point (in p_id int)
	begin
		select id, name, area, created, updated, inuse from railmon_sensor_monitoring_point where id = p_id;
    end//

create procedure sp_update_sensor_monitoring_point (in p_id int, p_name varchar(64), p_area varchar(64))
	begin
		update railmon_sensor_monitoring_point
        set
			name = p_name,
            area = p_area
		where id = p_id;
        
        call sp_select_sensor_monitoring_point(p_id);
    end//

create procedure sp_insert_sensor (in p_railmon_sensor_monitoring_point_ref int, p_prev_id_ref varchar(64), p_name varchar(64), p_department varchar(64), p_system varchar(64), p_type varchar(64), p_purpose varchar(64), p_upper_threshold int, p_lower_threshold int, p_calibration_date date, p_calibration_valid_weeks smallInt, p_calibration_cert_url varchar(256), p_installed_date date, p_commissioned_date date, p_uninstalled_date date, p_status varchar(64), out insertId int)
	begin
		insert into railmon_sensor (
			railmon_sensor_monitoring_point_ref,
            prev_id_ref,
			name,
			department,
			`system`,
			`type`,
			purpose,
			upper_threshold,
			lower_threshold,
			calibration_date,
			calibration_valid_weeks,
			calibration_cert_url,
			installed_date,
			commissioned_date,
			uninstalled_date,
			`status`)
		values (
			p_railmon_sensor_monitoring_point_ref,
            p_prev_id_ref,
			p_name,
			p_department,
			p_system,
			p_type,
			p_purpose,
			p_upper_threshold,
			p_lower_threshold,
			p_calibration_date,
			p_calibration_valid_weeks,
			p_calibration_cert_url,
			p_installed_date,
			p_commissioned_date,
			p_uninstalled_date,
			p_status
        );

        set insertId := last_insert_id();
        select insertId;
    end//

create procedure sp_select_sensors (in p_railmon_sensor_monitoring_point_ref int, searchText varchar(64))
	begin
		if(searchText <> '') then
			select id, prev_id_ref, name, department, `system`, `type`, purpose, 
			upper_threshold, lower_threshold,
            calibration_date, calibration_valid_weeks, calibration_cert_url,
            installed_date, commissioned_date, uninstalled_date, `status`,
            created, updated, inuse
            from railmon_sensor
            where railmon_sensor_monitoring_point_ref = p_railmon_sensor_monitoring_point_ref
            and inuse = 1
			and match(name, department, `system`, `type`) against(searchText in boolean mode)
            order by name desc;
        else
			select id, prev_id_ref, name, department, `system`, `type`, purpose, 
			upper_threshold, lower_threshold,
            calibration_date, calibration_valid_weeks, calibration_cert_url,
            installed_date, commissioned_date, uninstalled_date, `status`,
            created, updated, inuse
            from railmon_sensor
            where railmon_sensor_monitoring_point_ref = p_railmon_sensor_monitoring_point_ref
            and inuse = 1
            order by name desc;
        end if;
    end//

create procedure sp_select_sensor (in p_id int)
	begin
		select id, prev_id_ref, name, department, `system`, `type`, purpose, 
			upper_threshold, lower_threshold,
            calibration_date, calibration_valid_weeks, calibration_cert_url,
            installed_date, commissioned_date, uninstalled_date, `status`,
            created, updated, inuse
		from railmon_sensor a
        where id = p_id;
    end//

create procedure sp_update_sensor (in p_id int, p_railmon_sensor_monitoring_point_ref int, p_prev_id_ref varchar(64), p_name varchar(64), p_department varchar(64), p_system varchar(64), p_type varchar(64), p_purpose varchar(64), p_upper_threshold int, p_lower_threshold int, p_calibration_date date, p_calibration_valid_weeks smallInt, p_calibration_cert_url varchar(256), p_installed_date date, p_commissioned_date date, p_uninstalled_date date, p_status varchar(64))
	begin
		update railmon_sensor set
			railmon_sensor_monitoring_point_ref = p_railmon_sensor_monitoring_point_ref,
            prev_id_ref = p_prev_id_ref,
			name = p_name,
			department = p_department,
			`system` = p_system,
			`type` = p_type,
			purpose = p_purpose,
			upper_threshold = p_upper_threshold,
			lower_threshold = p_lower_threshold,
			calibration_date = p_calibration_date,
			calibration_valid_weeks = p_calibration_valid_weeks,
			calibration_cert_url = p_calibration_cert_url,
			installed_date = p_installed_date,
			commissioned_date = p_commissioned_date,
			uninstalled_date = p_uninstalled_date,
			`status` = p_status
		where id = p_id;
        
        call sp_select_sensor(p_id);
    end//

-- *******************
-- database triggers *
-- *******************
create trigger trg_update_railmon_points_machine_performance after insert on railmon_points_machine_swing_time
	for each row
		begin
			call sp_calculate_avg_points_swing_time(new.points_machine_ref, new.direction);
            call sp_calculate_std_deviation_points_swing_time(new.points_machine_ref, new.direction);
            call sp_calculate_current_avg_points_machine_swing_time(new.points_machine_ref, new.direction);
        end;//
delimiter ;

