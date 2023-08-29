select distinct
    b.name as 'route',
    -- a.id, 
    -- a.route_code,
    d.name as 'line',
    -- a.line_number,
    -- c.direction,
    e.name as 'from',
    f.name as 'to',
    a.sequence as 'stop sequence',
    e.terminus'is from terminus',
    f.terminus 'is to terminus',
    g.dwell_time,
    c.transit_time as 'transit seconds'
from tms_route_section_link a 
    inner join tms_route_section b on a.route_code = b.route_code and a.line_number = b.line_number
    inner join tms_route_link c on a.id = c.id
    inner join tms_line d on a.line_number = d.line_number
    inner join tms_stop e on c.from_stop_id = e.id
    inner join tms_stop f on c.to_stop_id = f.id
    left outer join tms_platform g on f.id = g.stop_id and c.direction = g.direction and g.stabling = false
where 
    a.route_code = 1 
    and a.line_number = 2
order by a.sequence asc;