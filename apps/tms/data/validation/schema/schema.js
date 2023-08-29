const moment = require('moment');

const postPointMachineSwingTimeSchema = {
    id: value => value.length > 0 && value.length <= 6,
    direction: value => value === 'Point Set Right' || value === 'Point Set Left',
    swingTime: value => parseInt(value) === Number(value),
    tmsTimestamp: value => moment(value).isValid()
};

const postUserSchema = {
    displayName: value => value.length > 0 && value.length <= 50,
    email: value => /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(value),
    password: value => value.length === 64
};

const postLoginSchema = {
    email: value => /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(value),
    password: value => value.length === 64
};

const postLogoutSchema = {
    localId: value => parseInt(value) === Number(value)
};

const postFeedbackSchema = {
    localId: value => parseInt(value) === Number(value),
    title: value => value.length > 0 && value.length <= 50,
    feedback: value => value.length > 0 && value.length <= 300
};

const postIntelliverseSchema = {
    id: value => value.length === 36,
    universe: value => value.length > 0 && value.length <= 50,
    entry: value => value.length > 0 && value.length <= 200
};

const postOrganisationAreaSchema = {
    name: value => value.length > 0 && value.length <= 50,
    description: value => value.length > 0 && value.length <= 200
};

const postLocationSchema = {
    name: value => value.length > 0 && value.length <= 50,
    description: value => value.length > 0 && value.length <= 200,
    parentId: value => parseInt(value) === Number(value) || value === null
};

const postRiskSchema = {
    title: value => value.length > 0 && value.length <= 50,
    description: value => value.length > 0 && value.length <= 500,
    impactStatement: value => value.length > 0 && value.length <= 500,
    likelihoodScore: value => value >= 1 && value <= 6,
    appetiteScore: value => value >= 1 && value <= 36,
    healthSafetyImpactScore: value => value >= 1 && value <= 6,
    complianceImpactScore: value => value >= 1 && value <= 6,
    financialImpactScore: value => value >= 1 && value <= 6,
    serviceImpactScore: value => value >= 1 && value <= 6,
    humanResourceImpactScore: value => value >= 1 && value <= 6,
    projectImpactScore: value => value >= 1 && value <= 6,
    reputationImpactScore: value => value >= 1 && value <= 6,
    objectiveImpactScore:  value => value >= 1 && value <= 6,
    publicityImpactScore: value => value >= 1 && value <= 6,
    status: value => value.length > 0 && value.length <= 50
};

const postRiskLocationSchema = {
    id: value => (typeof value) === 'number'
};

const postRiskKeyWordPhraseSchema = {
    result: value => value.length > 0 && value.length <= 200
};

const postRiskAreaSchema = {
    id: value => (typeof value) === 'number'
};

const postTmsVersionSchema = {
    version: value => value.length > 0 && value.length <= 10,
    releaseDate: value => value.length > 0 && value.length <= 10,
    obcVersion: value => value.length > 0 && value.length <= 20,
    type: value => value.length > 0 && value.length <= 20,
};

const postNetworkSectionSchema = {
    name: value => value.length > 0 && value.length <= 50
};

const postTramSchema = {
    fleetNumber: value => (typeof value) === 'number',
    refIPAddress: value => value.length > 0 && value.length <= 15,
    siteIPAddress: value => value.length > 0 && value.length <= 15,
    type: value => value.length > 0 && value.length <= 50,  
};

const postGeographicalAreaSchema = {
    id: value => (typeof value) === 'number',
    networkSectionName: value => value.length > 0 && value.length <= 50,
    geographicalAreaName: value => value.length > 0 && value.length <= 50
};

const postDeploymentAreaSchema = {
    id: value => value.length > 0 && value.length <= 3,
    host: value => value.length > 0 && value.length <= 50,
    opcServerNameSite: value => value.length >= 0 && value.length <= 50,
    opcServerNameReference: value => value.length >= 0 && value.length <= 50,
    opcServerHostSite: value => value.length >= 0 && value.length <= 50,
    opcServerHostReference: value => value.length >= 0 && value.length <= 50,
};

const postTrackAreaSchema = {
    id: value => value.length > 0 && value.length <= 3,
    accessBit: value => (typeof value) === 'number',
    name: value => value.length >= 0 && value.length <= 50,
    deploymentArea: value => value.length > 0 && value.length <= 3
};

const postTrackSectionSchema = {
    id: value => (typeof value) === 'number',
    trackArea: value => value.length > 0 && value.length <= 3,
    superTrack: value => value.length > 0 && value.length <= 4,
    wallTrackId: value => value.length > 0 && value.length <= 4,
    newWallTrackId: value => value.length > 0 && value.length <= 4
};

const postTrackSectionDetectorPairSchema = {
    id: value => (typeof value) === 'number',
    entry: value => value.length > 0 && value.length <= 5,
    exit: value => value.length > 0 && value.length <= 5,
    assoc: value => value === null || value.length > 0 && value.length <= 50
};

const postConflictMonitorSchema = {
    equipmentNumber: value => value.length > 0 && value.length <= 3,
    inService: value => (typeof value) === 'boolean',
    trackArea: value => value.length > 0 && value.length <= 3,
    earped: value => (typeof value) === 'boolean',
    description: value => value.length > 0 && value.length <= 50
};

const postLocalControllerSchema = { 
    id: value => (typeof value) === 'number',
    equipmentNumber: value => value.length > 0 && value.length <= 3,
    inService: value => (typeof value) === 'boolean',
    trackArea: value => value.length > 0 && value.length <= 3,
    refIPAddress: value => value.length > 0 && value.length <= 15,
    siteIPAddress: value => value.length > 0 && value.length <= 15,
    portNumber: value => (typeof value) === 'number',
    description: value => value.length > 0 && value.length <= 50
};

const postPointsSchema = {
    equipmentNumber: value => value.length > 0 && value.length <= 6,
    type: value => value.length > 0 && value.length <= 50,
    direction: value => value.length > 0 && value.length <= 50,
    normalPosition: value => value.length > 0 && value.length <= 50,
    normalPositionTimeout: value => (typeof value) === 'number',
    routeBlockingDisabled: value => (typeof value) === 'boolean',
    teml41: value => (typeof value) === 'boolean',
    localController: value => value.length > 0 && value.length <= 3
};

const postSignalSchema = {
    equipmentNumber: value => value.length > 0 && value.length <= 6,
    direction: value => value.length > 0 && value.length <= 50,
    geoArea: value => (typeof value) === 'number',
    localController: value => value.length > 0 && value.length <= 3,
    conflictMonitor: value => value.length > 0 && value.length <= 3
};

const postDetectorSchema = {
    id: value => (typeof value) === 'number',
    equipmentNumber: value => value.length > 0 && value.length <= 5,
    chain: value => value.length > 0 && value.length <= 3,
    type: value => value.length > 0 && value.length <= 50,
    usedBy: value => value.length > 0 && value.length <= 50,
    primaryController: value => value.length > 0 && value.length <= 3,
    RTSEnabled: value => (typeof value) === 'boolean',
    criticalLoop: value => (typeof value) === 'boolean',
    distance: value => (typeof value) === 'number'
};

const postChainlinkSchema = {
    entry: value => value.length > 0 && value.length <= 5,
    exit: value => value.length > 0 && value.length <= 5,
    distance: value => (typeof value) === 'number'
};

const postSpasZoneSchema = {
    id: value => value.length > 0 && value.length <= 6,
    localController: value => value.length > 0 && value.length <= 3,
    conflictMonitor: value => value.length > 0 && value.length <= 3
};

const postMassDetectorSchema = {
    id: value => value.length > 0 && value.length <= 10,
    localController: value => value.length > 0 && value.length <= 3,
    conflictMonitor: value => value === null || value.length > 0 && value.length <= 3,
    assocSpas: value => value === null || value.length > 0 && value.length <= 6
};

const postAxleCounterSchema = {
    id: value => value.length > 0 && value.length <= 9,
    type: value => value.length > 0 && value.length <= 50,
    assocSpas: value => value === null || value.length > 0 && value.length <= 6,
    localController: value => value.length > 0 && value.length <= 3,
    conflictmonitor: value => value === null || value.length > 0 && value.length <= 3
};

const postStopSchema = {
    id: value => (typeof value) === 'number',
    atoc: value => value.length > 0 && value.length <= 11,
    name: value => value.length > 0 && value.length <= 50,
    shortName:  value => value.length > 0 && value.length <= 50,
    tla: value => value.length > 0 && value.length <= 3,
    terminus: value => (typeof value) === 'boolean',
    layoverTime: value => (typeof value) === 'number',
    geoArea: value => (typeof value) === 'number',
    localController: value => value.length > 0 && value.length <= 3,
    type: value => value.length > 0 && value.length <= 50,
    preferredPlaform: value => value.length > 0 && value.length <= 50
};

const postPlatformSchema = {
    stopId: value => (typeof value) === 'number',
    id: value => (typeof value) === 'number',
    name: value => value.length > 0 && value.length <= 50,
    direction: value => value.length > 0 && value.length <= 50,
    queueType: value => value.length > 0 && value.length <= 50,
    queueDirection: value => value.length > 0 && value.length <= 50,
    dwellTime: value => (typeof value) === 'number',
    stabling: value => (typeof value) === 'boolean',
    vtLoop: value => value === null || value.length > 0 && value.length <= 5,
};

const postLineSchema = {
    lineNumber: value => (typeof value) === 'number',
    name: value => value.length > 0 && value.length <= 50,
    displayId:value => value.length > 0 && value.length <= 2
};

const postRouteSectionSchema = {
    routeCode: value => (typeof value) === 'number',
    lineNumber: value => (typeof value) === 'number',
    description: value => value.length > 0 && value.length <= 50,
    destination: value => (typeof value) === 'number'
};

const postRouteSectionLinkSchema = {
    id: value => value.length > 0 && value.length <= 20,
    routeCode: value => (typeof value) === 'number',
    lineNumber: value => (typeof value) === 'number',
    sequence: value => (typeof value) === 'number',
};

const postRouteLinkSchema = {
    id: value => value.length > 0 && value.length <= 20,
    direction: value => value.length > 0 && value.length <= 50,
    transitTime: value => (typeof value) === 'number',
    from: value => (typeof value) === 'number',
    to:value => (typeof value) === 'number'
};

const postRouteLinkDetectorSequenceSchema = {
    id: value => value.length > 0 && value.length <= 20,
    sequence: value => (typeof value) === 'number',
    detector:value => value.length > 0 && value.length <= 6
};

const postRouteLinkDetectorAtStopSchema = {
    id: value => value.length > 0 && value.length <= 20,
    detector: value => value.length > 0 && value.length <= 6,
    platform: value => (typeof value) === 'number',
    trigAssoc: value => value.length > 0 && value.length <= 50
};

const postRouteLinkDetectorDepartSchema = {
    id: value => value.length > 0 && value.length <= 20,
    detector: value => value.length > 0 && value.length <= 6,
    platform: value => (typeof value) === 'number'
};

const postRouteLinkDetectorApproachSchema = {
    id: value => value.length > 0 && value.length <= 20,
    detector: value => value.length > 0 && value.length <= 6,
    platform: value => (typeof value) === 'number'
};

const postRouteLinkDetectorArriveSchema = {
    id: value => value.length > 0 && value.length <= 20,
    detector: value => value.length > 0 && value.length <= 6,
    platform: value => (typeof value) === 'number'
};

const postMetrolinkLiveRoute = {
    tramId: value =>  (typeof value) === 'number',
    area: value => value.length > 0 && value.length <= 3,
    lineNumber: value =>  (typeof value) === 'number',
    routeCode: value =>  (typeof value) === 'number',
    loop: value =>  (typeof value) === 'number',
    timestamp: value => value.length > 0 && value.length <= 12,
    event: value => value.length > 0 && value.length <= 50,
};

const postTXCStopSchema = {
    stopPointRef: value => value.length > 0 && value.length <= 11,
    commonName: value => value.length > 0 && value.length <= 50
};

const postTXCOperatorSchema = {
    id: value => value.length > 0 && value.length <= 2,
    code: value => value.length > 0 && value.length <= 3,
    name: value => value.length > 0 && value.length <= 50
};

const postTXCGarageSchema = {
    code: value => value.length > 0 && value.length <= 3,
    operatorId: value => value.length > 0 && value.length <= 2,
    name: value => value.length > 0 && value.length <= 50
};

const postTXCRouteSchema = {
    id: value => value.length > 0 && value.length <= 10,
    privateCode: value => value.length > 0 && value.length <= 3,
    description:value => value.length > 0 && value.length <= 100,
    routeSectionRef: value => value.length > 0 && value.length <= 7
}

const postTXCRouteSectionSchema = {
    id: value => value.length > 0 && value.length <= 7,
    routeLinkId: value => value.length > 0 && value.length <= 10,
    fromStopPointRef: value => value.length > 0 && value.length <= 11,
    toStopPointRef: value => value.length > 0 && value.length <= 11,
    direction: value => value.length > 0 && value.length <= 50
};

const postTXCJourneyPatternSectionSchema = {
    id: value => value.length > 0 && value.length <= 5,
    timingLinkId: value => value.length > 0 && value.length <= 10,
    fromId: value => value.length > 0 && value.length <= 8,
    fromSequenceNumber: value => (typeof value) === 'number',
    fromStopPointRef: value => value.length > 0 && value.length <= 11,
    fromTimingStatus: value => value.length > 0 && value.length <= 3,
    toId: value => value.length > 0 && value.length <= 8,
    toSequenceNumber: value => (typeof value) === 'number',
    toStopPointRef: value => value.length > 0 && value.length <= 11,
    toTimingStatus: value => value.length > 0 && value.length <= 3,
    routeLinkRef: value => value.length > 0 && value.length <= 10,
    runtime: value => (typeof value) === 'number'
};

const postTXCServiceSchema = {
    code: value => (typeof value) === 'number',
    lineId: value => value.length > 0 && value.length <= 3,
    lineRef: value => (typeof value) === 'number',
    startDate: value => value.length > 0 && value.length <= 10,
    operatorRef: value => value.length > 0 && value.length <= 2,
    direction: value => value.length > 0 && value.length <= 50,
    origin: value => value.length > 0 && value.length <= 50,
    destination: value => value.length > 0 && value.length <= 50
};

const postTXCServiceJourneyPatternSchema = {
    serviceCode: value => (typeof value) === 'number',
    journeyPatternId : value => value.length > 0 && value.length <= 6,
    direction: value => value.length > 0 && value.length <= 50,
    routeRef: value => value.length > 0 && value.length <= 10,
    journeyPatternSectionRef: value => value.length > 0 && value.length <= 5
};

const postTXCVehicleJourneySchema = {
    sequence: value => (typeof value) === 'number',
    block: value => value.length > 0 && value.length <= 10,
    blockNumber: value => (typeof value) === 'number',
    ticketJourneyCode: value => value.length > 0 && value.length <= 10,
    vehicleJourneyCode: value => value.length > 0 && value.length <= 6,
    serviceRef: value => (typeof value) === 'number',
    lineRef: value => value.length > 0 && value.length <= 3,
    serviceJourneyPatternRef: value => value.length > 0 && value.length <= 6,
    deadRunId: value => value === null || value.length > 0 && value.length <= 10,
    deadRunPositioningLinkId: value => value === null || value.length > 0 && value.length <= 12,
    deadRunTime: value => value === null || (typeof value) === 'number',
    fromGarage: value => value === null || value.length > 0 && value.length <= 3,
    toStopPointRef: value => value === null || value.length > 0 && value.length <= 11,
    departureTime: value => value === null || value.length > 0 && value.length <= 8,
};

const patchDisplayNameSchema = {
    localId: value => parseInt(value) === Number(value),
    displayName: value => value.length > 0 && value.length <= 50
};

const patchEmailSchema = {
    localId: value => parseInt(value) === Number(value),
    email: value => /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(value)
};

const patchAvatarUrlSchema = {
    localId: value => parseInt(value) === Number(value),
    avatarUrl: value => /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value)
};

const patchAvatarSchema = {
    localId: value => parseInt(value) === Number(value),
    avatar: value => value === 'delete'
};

const patchPasswordSchema = {
    localId: value => parseInt(value) === Number(value),
    password: value => value.length === 64
};

const getUserSchema = {
    localId: value => parseInt(value) === Number(value)
};

const getFeedbackSchema = {
    param: value => parseInt(value) === Number(value)
};

const getTokenSchema = {
    idToken: value => value.length === 256
};

const userIdSchema = {
    localId: value => parseInt(value) === Number(value)
};

module.exports = {
    postPointMachineSwingTimeSchema: postPointMachineSwingTimeSchema
}