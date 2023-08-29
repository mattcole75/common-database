// date: 2021-09-28
// -> update 2023-08-19 database direct
// Engineer: Matt Cole
// Description: This script reads the tms topology file and inserts the deployment area section into the database

const fetch = require('node-fetch');
const parser = require('xml2js').parseString;

const config = require('../../../../config/database/connection/config');

const mysql = require('mysql');

const connection = mysql.createConnection(config.get('db'));

const sql = 'insert into tms_deployment_area (id, host, opc_server_name_site, opc_server_name_reference, opc_server_host_site, opc_server_host_reference) values (?)';

connection.connect();

const xml = 'http://127.0.0.1:8080/tms/NetworkTopologyModel.xml';

console.log('Loading: TMS Deployment Areas...');

fetch(xml)
.then(response => {
    return response.text();
})
.then (data => {
    parser(data, (error, result) => {
        if(error)
            throw new Error(error);
        else {
            result.NetworkTopology.DeploymentAreas[0].DeploymentArea.forEach(deploymentArea => {

                const values = [
                    deploymentArea.$.ID, 
                    deploymentArea.Host, 
                    deploymentArea.OpcServerName[0].$.Site, 
                    deploymentArea.OpcServerName[0].$.Reference, 
                    deploymentArea.OpcServerHost[0].$.Site, 
                    deploymentArea.OpcServerHost[0].$.Reference
                ];

                connection.query(sql, [values], (err, results, fields) => {
                    if (err)
                        console.log('err', err);
                    else
                        console.log('ok - deployment areas:', values.join(', '), '✔');
                });

            });
        }
    })
})
.catch(error => {
    console.log('Error in fetch: ', error);
})
.finally(() => {
    connection.end();
});