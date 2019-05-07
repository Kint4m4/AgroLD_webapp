/* 
 * knetmaps_adaptator.js
 * This script solves two limits of knetmaps
 */

function Dataset(_name, _allGraphData, _graph) {
    this.name = _name;
    this.allGraphData = _allGraphData;
    this.graph = _graph;
}

function GraphData(_graphName, _version) {
    this.graphName = _graphName;
    this.version = _version;
    this.concepts = [];
    this.relations = [];

    this.getNumberOfConcepts = function () {
        return this.concepts.length;
    };

    this.getNnumberOfRelations = function () {
        return this.relations.length;
    };

    this.addConcept = function (concept) {
        this.concepts.push(concept);
    };

    this.addRelation = function (relation) {
        this.relations.push(relation);
    };
}

function ConceptType(name) {
    this.name = name;

    this.getName = function () {
        return this.name;
    };
}

function RelationTypeStyle(relationName, relationColor, relationSize) {
    this.name = relationName;
    this.color = relationColor;
    this.size = relationSize;

    this.getName = function () {
        return this.name;
    };

    this.getColor = function () {
        return this.color;
    };

    this.getSize = function () {
        return this.size;
    };
}


function RelationType(relationName, sourceConceptType, targetConceptType) {
    this.name = relationName;
    this.sourceConceptType = sourceConceptType;
    this.targetConceptType = targetConceptType;
}

function Concept(id, annotation, elementOf, description, pid, value, conceptType,
        evidences) {
    this.id = id;
    this.annotation = annotation;
    this.elementOf = elementOf;
    this.description = description;
    this.pid = pid;
    this.value = value;
    this.ofType = conceptType.getName();
    this.evidences = evidences;
    this.contexts = [];
    this.conames = [];
    this.attributes = [];
    this.coaccessions = [];

    this.getId = function () {
        return this.id;
    };

    this.addConame = function (coname) {
        this.conames.push(coname);
    };

    this.addAttribute = function (attribute) {
        this.attributes.push(attribute);
    };

    this.addCoaccession = function (coaccession) {
        this.coaccessions.push(coaccession);
    };

    this.addContext = function (context) {
        this.contexts.push(context);
    };
}


function Coaccession(_elementOf, _accession) {
    this.elementOf = _elementOf;
    this.accession = _accession;
}


function Coname(name, isPreferred) {
    this.name = name;
    this.isPreferred = isPreferred;
}

function Attribute(attrname, value) {
    this.attrname = attrname;
    this.value = value;
}

function Relation(id, toConcept, fromConcept, ofType, evidences) {
    this.id = id;
    this.toConcept = toConcept.getId();
    this.fromConcept = fromConcept.getId();
    this.ofType = ofType;
    this.evidences = evidences;
    this.contexts = {};
    this.attributes = [];

    this.getId = function () {
        return this.id;
    };

    this.getOfType = function () {
        return this.ofType;
    };

    this.addAttribute = function (attribute) {
        this.attributes.push(attribute);
    };

    this.addContext = function (name, value) {
        this.contexts[name] = value;
    };
}

function Graph() {
    this.nodes = [];
    this.edges = [];

    this.addNode = function (node) {
        this.nodes.push(node);
    };

    this.addEdge = function (edge) {
        this.edges.push(edge);
    };
}


function Node(group, nodeData) {
    this.group = group;
    this.data = nodeData;
}

function ConceptTypeStyle(conceptType, conceptBorderColor, conceptSize,
        conceptTextBGopacity, conceptDisplay, conceptColor, conceptBorderStyle,
        conceptBorderWidth, conceptShape, conceptTextBGcolor) {
    this.conceptType = conceptType;
    this.conceptBorderColor = conceptBorderColor;
    this.conceptSize = conceptSize;
    this.conceptTextBGopacity = conceptTextBGopacity;
    this.conceptDisplay = conceptDisplay;
    this.conceptColor = conceptColor;
    this.conceptBorderStyle = conceptBorderStyle;
    this.conceptBorderWidth = conceptBorderWidth;
    this.conceptShape = conceptShape;
    this.conceptTextBGcolor = conceptTextBGcolor;
}

function NodeData(id, pid, value, flagged, displayValue, annotation,
        conceptTypeStyle) {
    this.id = id;
    this.pid = pid;
    this.value = value;
    this.flagged = flagged;
    this.displayValue = displayValue;
    this.annotation = annotation;
    this.conceptBorderColor = conceptTypeStyle.conceptBorderColor;
    this.conceptType = conceptTypeStyle.conceptType.getName();
    this.conceptSize = conceptTypeStyle.conceptSize;
    this.conceptTextBGopacity = conceptTypeStyle.conceptTextBGopacity;
    this.conceptDisplay = conceptTypeStyle.conceptDisplay;
    this.conceptColor = conceptTypeStyle.conceptColor;
    this.conceptBorderStyle = conceptTypeStyle.conceptBorderStyle;
    this.conceptBorderWidth = conceptTypeStyle.conceptBorderWidth;
    this.conceptShape = conceptTypeStyle.conceptShape;
    this.conceptTextBGcolor = conceptTypeStyle.conceptTextBGcolor;
}

//function NodeData(Concept) // ??? separate style that identifies types of concepts

function Edge(group, edgeData) {
    this.group = group;
    this.data = edgeData;
}

function EdgeData(sourceNode, targetNode, relationDisplay, relation, relationTypeStyle) {
    this.id = relation.getId();
    this.relationDisplay = relationDisplay;
    this.source = sourceNode;
    this.target = targetNode;
    this.label = relation.getOfType();
    this.relationColor = relationTypeStyle.getColor();
    this.relationSize = relationTypeStyle.getSize();
}

//function EdgeData(Concept) // ??? separate style that identifies relations

// type of concepts in AgroLD

/*
 * var CONCEPT_TYPES = ["Gene", "Protein", "QTL", "Chromosome", "Metabolic_Pathway", "Reaction", "Gene", "CDS", "Exon", "five_prime_UTR", "mRNA", "three_prime_UTR"]
 * http://www.southgreen.fr/agrold/resource/Gene
 * http://www.southgreen.fr/agrold/vocabulary/Gene
 * http://www.southgreen.fr/agrold/vocabulary/Protein	
 * http://www.southgreen.fr/agrold/resource/QTL
 * http://www.southgreen.fr/agrold/resource/Chromosome
 * http://www.southgreen.fr/agrold/vocabulary/Chromosome
 * http://www.southgreen.fr/agrold/vocabulary/Metabolic_Pathway
 * http://www.southgreen.fr/agrold/vocabulary/Reaction
 * http://www.southgreen.fr/agrold/vocabulary/CDS
 * http://www.southgreen.fr/agrold/vocabulary/Exon
 * http://www.southgreen.fr/agrold/vocabulary/five_prime_UTR
 * http://www.southgreen.fr/agrold/vocabulary/mRNA
 * http://www.southgreen.fr/agrold/vocabulary/three_prime_UTR
 */
/////////////////////// Interaction with the knowledge base (webservice)

function KnetmapsAdaptator() {
    this.describeBaseURL = WEBAPPURL + "/api/describe.json?pageSize=0&uri=";
    this._graphJSON = new Graph();
    this._allGraphData = new GraphData("FilteredGraphUnconnected", "1.0");
    this.nextId = 0;
    this.entitiesUnprocessedLinks = {};
    this.mapConceptURI2Id = {};
    this.mapConceptURI2Concept = {};

    this.RELATION_TYPES = {}; //label:->{label, sourceConceptType, targetConceptType}

    this.CONCEPT_TYPES = {"Gene": "", "Protein": "", "QTL": "", "Pathway": "", "Reaction": ""};
    for (var type in this.CONCEPT_TYPES) {
        this.CONCEPT_TYPES[type] = new ConceptType(type);
    }

    this.KNETMAPS_STYLES = {conceptStyle: {}, relationStyle: {}};
    // graph is a sample
    var graph = {"edges": [{"data": {"id": "e1", "source": "1", "relationColor": "springGreen", "relationSize": "1px", "relationDisplay": "none", "target": "2", "label": "located_in"}, "group": "edges"}, {"data": {"id": "e2", "source": "1", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "3", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e3", "source": "1", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "4", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e4", "source": "1", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "5", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e5", "source": "1", "relationColor": "grey", "relationSize": "3px", "relationDisplay": "element", "target": "6", "label": "encodes"}, "group": "edges"}, {"data": {"id": "e6", "source": "1", "relationColor": "grey", "relationSize": "3px", "relationDisplay": "element", "target": "7", "label": "encodes"}, "group": "edges"}, {"data": {"id": "e7", "source": "1", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "8", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e8", "source": "1", "relationColor": "orange", "relationSize": "1px", "relationDisplay": "none", "target": "9", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e9", "source": "1", "relationColor": "black", "relationSize": "3px", "relationDisplay": "element", "target": "10", "label": "has_physical_relation_with"}, "group": "edges"}, {"data": {"id": "e10", "source": "1", "relationColor": "purple", "relationSize": "1px", "relationDisplay": "none", "target": "11", "label": "has_function"}, "group": "edges"}, {"data": {"id": "e11", "source": "1", "relationColor": "purple", "relationSize": "1px", "relationDisplay": "none", "target": "12", "label": "has_function"}, "group": "edges"}, {"data": {"id": "e12", "source": "1", "relationColor": "purple", "relationSize": "1px", "relationDisplay": "none", "target": "13", "label": "has_function"}, "group": "edges"}, {"data": {"id": "e13", "source": "10", "relationColor": "greenYellow", "relationSize": "1px", "relationDisplay": "none", "target": "14", "label": "has_observed_phenotype"}, "group": "edges"}, {"data": {"id": "e14", "source": "10", "relationColor": "greenYellow", "relationSize": "3px", "relationDisplay": "element", "target": "15", "label": "has_observed_phenotype"}, "group": "edges"}, {"data": {"id": "e15", "source": "10", "relationColor": "greenYellow", "relationSize": "3px", "relationDisplay": "element", "target": "17", "label": "has_observed_phenotype"}, "group": "edges"}, {"data": {"id": "e17", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "16", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e16", "source": "10", "relationColor": "orange", "relationSize": "1px", "relationDisplay": "none", "target": "19", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e19", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "18", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e18", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "21", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e21", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "20", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e20", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "23", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e23", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "22", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e22", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "25", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e25", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "24", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e24", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "27", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e27", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "26", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e26", "source": "10", "relationColor": "orange", "relationSize": "1px", "relationDisplay": "none", "target": "29", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e29", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "28", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e28", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "8", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e31", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "31", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e30", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "30", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e34", "source": "10", "relationColor": "orange", "relationSize": "1px", "relationDisplay": "none", "target": "34", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e35", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "35", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e32", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "32", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e33", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "33", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e38", "source": "10", "relationColor": "orange", "relationSize": "1px", "relationDisplay": "none", "target": "38", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e39", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "39", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e36", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "36", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e37", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "37", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e42", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "42", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e43", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "43", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e40", "source": "10", "relationColor": "orange", "relationSize": "1px", "relationDisplay": "none", "target": "40", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e41", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "41", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e46", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "46", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e47", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "47", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e44", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "44", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e45", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "45", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e51", "source": "10", "relationColor": "orange", "relationSize": "1px", "relationDisplay": "none", "target": "51", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e50", "source": "10", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "50", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e49", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "49", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e48", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "48", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e55", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "55", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e54", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "54", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e53", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "53", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e52", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "52", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e59", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "59", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e58", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "58", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e57", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "57", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e56", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "56", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e63", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "63", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e62", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "62", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e61", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "61", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e60", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "60", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e68", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "68", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e69", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "69", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e70", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "70", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e71", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "71", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e64", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "64", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e65", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "65", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e66", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "66", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e67", "source": "10", "relationColor": "blue", "relationSize": "1px", "relationDisplay": "none", "target": "67", "label": "cooccurs_with"}, "group": "edges"}, {"data": {"id": "e76", "source": "10", "relationColor": "springGreen", "relationSize": "1px", "relationDisplay": "none", "target": "76", "label": "located_in"}, "group": "edges"}, {"data": {"id": "e77", "source": "10", "relationColor": "purple", "relationSize": "1px", "relationDisplay": "none", "target": "11", "label": "has_function"}, "group": "edges"}, {"data": {"id": "e78", "source": "10", "relationColor": "purple", "relationSize": "1px", "relationDisplay": "none", "target": "77", "label": "has_function"}, "group": "edges"}, {"data": {"id": "e79", "source": "10", "relationColor": "purple", "relationSize": "1px", "relationDisplay": "none", "target": "78", "label": "has_function"}, "group": "edges"}, {"data": {"id": "e72", "source": "10", "relationColor": "purple", "relationSize": "1px", "relationDisplay": "none", "target": "79", "label": "has_function"}, "group": "edges"}, {"data": {"id": "e73", "source": "10", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "72", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e74", "source": "10", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "73", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e75", "source": "10", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "74", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e85", "source": "10", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "75", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e84", "source": "10", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "85", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e87", "source": "10", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "84", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e86", "source": "10", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "87", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e81", "source": "10", "relationColor": "teal", "relationSize": "1px", "relationDisplay": "none", "target": "86", "label": "participates_in"}, "group": "edges"}, {"data": {"id": "e80", "source": "81", "relationColor": "black", "relationSize": "1px", "relationDisplay": "none", "target": "80", "label": "associated_with"}, "group": "edges"}, {"data": {"id": "e83", "source": "1", "relationColor": "navy", "relationSize": "1px", "relationDisplay": "none", "target": "81", "label": "has_variation"}, "group": "edges"}, {"data": {"id": "e82", "source": "81", "relationColor": "black", "relationSize": "1px", "relationDisplay": "none", "target": "83", "label": "associated_with"}, "group": "edges"}, {"data": {"id": "e93", "source": "1", "relationColor": "navy", "relationSize": "1px", "relationDisplay": "none", "target": "82", "label": "has_variation"}, "group": "edges"}, {"data": {"id": "e92", "source": "82", "relationColor": "black", "relationSize": "1px", "relationDisplay": "none", "target": "92", "label": "associated_with"}, "group": "edges"}, {"data": {"id": "e95", "source": "1", "relationColor": "navy", "relationSize": "1px", "relationDisplay": "none", "target": "91", "label": "has_variation"}, "group": "edges"}, {"data": {"id": "e94", "source": "91", "relationColor": "black", "relationSize": "1px", "relationDisplay": "none", "target": "94", "label": "associated_with"}, "group": "edges"}, {"data": {"id": "e89", "source": "89", "relationColor": "black", "relationSize": "1px", "relationDisplay": "none", "target": "93", "label": "associated_with"}, "group": "edges"}, {"data": {"id": "e88", "source": "1", "relationColor": "navy", "relationSize": "1px", "relationDisplay": "none", "target": "89", "label": "has_variation"}, "group": "edges"}, {"data": {"id": "e91", "source": "6", "relationColor": "black", "relationSize": "3px", "relationDisplay": "element", "target": "90", "label": "xref"}, "group": "edges"}, {"data": {"id": "e90", "source": "90", "relationColor": "orange", "relationSize": "3px", "relationDisplay": "element", "target": "88", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e96", "source": "90", "relationColor": "orange", "relationSize": "1px", "relationDisplay": "none", "target": "9", "label": "published_in"}, "group": "edges"}, {"data": {"id": "e97", "source": "7", "relationColor": "black", "relationSize": "3px", "relationDisplay": "element", "target": "90", "label": "xref"}, "group": "edges"}], "nodes": [{"data": {"conceptType": "Gene", "flagged": "true", "conceptSize": "26px", "conceptBorderStyle": "double", "pid": "AT5G45100;locus: 2153227", "conceptBorderColor": "navy", "displayValue": "BRG1", "conceptBorderWidth": "3px", "id": "1", "annotation": "protein_coding", "conceptColor": "lightBlue", "value": "BRG1", "conceptTextBGcolor": "black", "conceptShape": "triangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Cellular_Component", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0005737", "conceptBorderColor": "black", "displayValue": "cytoplasm", "conceptBorderWidth": "1px", "id": "2", "annotation": "All of the contents of a cell excluding the plasma membrane and nucleus,  but including other subcellular structures. ( Reference:  ISBN: 0198547684 )", "conceptColor": "springGreen", "value": "cytoplasm", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0006952", "conceptBorderColor": "black", "displayValue": "defense response", "conceptBorderWidth": "1px", "id": "3", "annotation": "Reactions,  triggered in response to the presence of a foreign body or the occurrence of an injury,  which result in restriction of damage to the organism attacked or prevention recovery from the infection caused by the attack. ( Reference:  GOC: go_curators )", "conceptColor": "teal", "value": "defense response", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0043067", "conceptBorderColor": "black", "displayValue": "regulation of programmed cell...", "conceptBorderWidth": "1px", "id": "4", "annotation": "Any process that modulates the frequency,  rate or extent of programmed cell death,  cell death resulting from activation of endogenous cellular processes. ( Reference:  GOC: jl )", "conceptColor": "teal", "value": "regulation of programmed cell death", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0043161", "conceptBorderColor": "black", "displayValue": "proteasomal pathway", "conceptBorderWidth": "1px", "id": "5", "annotation": "The chemical reactions and pathways resulting in the breakdown of a protein or peptide by hydrolysis of its peptide bonds,  initiated by the covalent attachment of ubiquitin,  and mediated by the proteasome. ( Reference:  GOC: go_curators )", "conceptColor": "teal", "value": "proteasomal pathway", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Protein", "flagged": "false", "conceptSize": "22px", "conceptBorderStyle": "solid", "pid": "AT5G45100.1", "conceptBorderColor": "black", "displayValue": "AT5G45100.1", "conceptBorderWidth": "1px", "id": "6", "annotation": "", "conceptColor": "red", "value": "AT5G45100.1", "conceptTextBGcolor": "black", "conceptShape": "ellipse", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Protein", "flagged": "false", "conceptSize": "22px", "conceptBorderStyle": "solid", "pid": "AT5G45100.2", "conceptBorderColor": "black", "displayValue": "AT5G45100.2", "conceptBorderWidth": "1px", "id": "7", "annotation": "", "conceptColor": "red", "value": "AT5G45100.2", "conceptTextBGcolor": "black", "conceptShape": "ellipse", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "26298008", "conceptBorderColor": "black", "displayValue": "PMID: 26298008", "conceptBorderWidth": "1px", "id": "8", "annotation": "", "conceptColor": "orange", "value": "PMID: 26298008", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "20921156;PMID: 20921156", "conceptBorderColor": "black", "displayValue": "PMID: 20921156", "conceptBorderWidth": "1px", "id": "9", "annotation": "[IDENTIFICATION,  INDUCTION BY PATHOGEN; SALICYLIC ACID; GIBBERELLIC ACID; ACC; METHYL JASMONATE AND SALT,  DISRUPTION PHENOTYPE]", "conceptColor": "orange", "value": "PMID: 20921156", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Gene", "flagged": "false", "conceptSize": "22px", "conceptBorderStyle": "solid", "pid": "AT5G15840;locus: 2143206", "conceptBorderColor": "black", "displayValue": "CO", "conceptBorderWidth": "1px", "id": "10", "annotation": "protein_coding", "conceptColor": "lightBlue", "value": "CO", "conceptTextBGcolor": "black", "conceptShape": "triangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Molecular_Function", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0008270", "conceptBorderColor": "black", "displayValue": "zinc binding", "conceptBorderWidth": "1px", "id": "11", "annotation": "Interacting selectively and non-covalently with zinc (Zn) ions. ( Reference:  GOC: ai )", "conceptColor": "purple", "value": "zinc binding", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Molecular_Function", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0016874", "conceptBorderColor": "black", "displayValue": "synthetase", "conceptBorderWidth": "1px", "id": "12", "annotation": "Catalysis of the joining of two substances,  or two groups within a single molecule,  with the concomitant hydrolysis of the diphosphate bond in ATP or a similar triphosphate. ( Reference:  EC: 6 GOC: mah )", "conceptColor": "purple", "value": "synthetase", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Molecular_Function", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0004842", "conceptBorderColor": "black", "displayValue": "ubiquitin-protein transferase...", "conceptBorderWidth": "1px", "id": "13", "annotation": "Catalysis of the transfer of ubiquitin from one protein to another via the reaction X-Ub + Y --> Y-Ub + X,  where both X-Ub and Y-Ub are covalent linkages. ( Reference:  GOC: BioGRID GOC: jh2 PMID: 9635407 )", "conceptColor": "purple", "value": "ubiquitin-protein transferase activity", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Phenotype", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "Defects in the photoperiod pa...", "conceptBorderWidth": "1px", "id": "14", "annotation": "", "conceptColor": "greenYellow", "value": "Defects in the photoperiod pathway.", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Phenotype", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "Slight increase in delay in f...", "conceptBorderWidth": "1px", "id": "15", "annotation": "", "conceptColor": "greenYellow", "value": "Slight increase in delay in flowering under LD conditions compared to co-1 single mutant.", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Phenotype", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "Flowering time of mutants at ...", "conceptBorderWidth": "1px", "id": "17", "annotation": "", "conceptColor": "greenYellow", "value": "<span style=\"background-color: yellow\"><b>Flowering<\/b><\/span> time of mutants at 23°C short days and 27°C in short days is not affected compared to wild type.", "conceptTextBGcolor": "gold", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "1"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "17916114;PMID: 17916114", "conceptBorderColor": "black", "displayValue": "PMID: 17916114", "conceptBorderWidth": "1px", "id": "16", "annotation": "", "conceptColor": "orange", "value": "PMID: 17916114", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "21798944;PMID: 21798944", "conceptBorderColor": "black", "displayValue": "PMID: 21798944", "conceptBorderWidth": "1px", "id": "19", "annotation": "", "conceptColor": "orange", "value": "PMID: 21798944", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "27015278;PMID: 27015278", "conceptBorderColor": "black", "displayValue": "PMID: 27015278", "conceptBorderWidth": "1px", "id": "18", "annotation": "[INTERACTION WITH MIP1A,  SUBCELLULAR LOCATION]", "conceptColor": "orange", "value": "PMID: 27015278", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "25228341;PMID: 25228341", "conceptBorderColor": "black", "displayValue": "PMID: 25228341", "conceptBorderWidth": "1px", "id": "21", "annotation": "", "conceptColor": "orange", "value": "PMID: 25228341", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "16006578;PMID: 16006578", "conceptBorderColor": "black", "displayValue": "PMID: 16006578", "conceptBorderWidth": "1px", "id": "20", "annotation": "", "conceptColor": "orange", "value": "PMID: 16006578", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "21950734", "conceptBorderColor": "black", "displayValue": "PMID: 21950734", "conceptBorderWidth": "1px", "id": "23", "annotation": "[FUNCTION,  INTERACTION WITH CO,  TISSUE SPECIFICITY,  INDUCTION]", "conceptColor": "orange", "value": "PMID: 21950734", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "18296627;PMID: 18296627", "conceptBorderColor": "black", "displayValue": "PMID: 18296627", "conceptBorderWidth": "1px", "id": "22", "annotation": "", "conceptColor": "orange", "value": "PMID: 18296627", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "11323677;PMID: 11323677", "conceptBorderColor": "black", "displayValue": "PMID: 11323677", "conceptBorderWidth": "1px", "id": "25", "annotation": "[FUNCTION]", "conceptColor": "orange", "value": "PMID: 11323677", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "16709197", "conceptBorderColor": "black", "displayValue": "PMID: 16709197", "conceptBorderWidth": "1px", "id": "24", "annotation": "", "conceptColor": "orange", "value": "PMID: 16709197", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "25211338", "conceptBorderColor": "black", "displayValue": "PMID: 25211338", "conceptBorderWidth": "1px", "id": "27", "annotation": "[INTERACTION WITH MRG1 AND MRG2]", "conceptColor": "orange", "value": "PMID: 25211338", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "22628657;PMID: 22628657", "conceptBorderColor": "black", "displayValue": "PMID: 22628657", "conceptBorderWidth": "1px", "id": "26", "annotation": "[FUNCTION,  INTERACTION WITH CO,  SUBCELLULAR LOCATION]", "conceptColor": "orange", "value": "PMID: 22628657", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "15937324;PMID: 15937324", "conceptBorderColor": "black", "displayValue": "PMID: 15937324", "conceptBorderWidth": "1px", "id": "29", "annotation": "[INTERACTION WITH DI19 AND COL1,  SUBCELLULAR LOCATION]", "conceptColor": "orange", "value": "PMID: 15937324", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "17138697;PMID: 17138697", "conceptBorderColor": "black", "displayValue": "PMID: 17138697", "conceptBorderWidth": "1px", "id": "28", "annotation": "", "conceptColor": "orange", "value": "PMID: 17138697", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "18790998;PMID: 18790998", "conceptBorderColor": "black", "displayValue": "PMID: 18790998", "conceptBorderWidth": "1px", "id": "31", "annotation": "[FUNCTION]", "conceptColor": "orange", "value": "PMID: 18790998", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "22408073", "conceptBorderColor": "black", "displayValue": "PMID: 22408073", "conceptBorderWidth": "1px", "id": "30", "annotation": "", "conceptColor": "orange", "value": "PMID: 22408073", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "24554768", "conceptBorderColor": "black", "displayValue": "PMID: 24554768", "conceptBorderWidth": "1px", "id": "34", "annotation": "", "conceptColor": "orange", "value": "PMID: 24554768", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "25422419", "conceptBorderColor": "black", "displayValue": "PMID: 25422419", "conceptBorderWidth": "1px", "id": "35", "annotation": "", "conceptColor": "orange", "value": "PMID: 25422419", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "17138694;PMID: 17138694", "conceptBorderColor": "black", "displayValue": "PMID: 17138694", "conceptBorderWidth": "1px", "id": "32", "annotation": "[INTERACTION WITH SUF4]", "conceptColor": "orange", "value": "PMID: 17138694", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "18667727;PMID: 18667727", "conceptBorderColor": "black", "displayValue": "PMID: 18667727", "conceptBorderWidth": "1px", "id": "33", "annotation": "", "conceptColor": "orange", "value": "PMID: 18667727", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "23449474", "conceptBorderColor": "black", "displayValue": "PMID: 23449474", "conceptBorderWidth": "1px", "id": "38", "annotation": "", "conceptColor": "orange", "value": "PMID: 23449474", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "25105952", "conceptBorderColor": "black", "displayValue": "PMID: 25105952", "conceptBorderWidth": "1px", "id": "39", "annotation": "", "conceptColor": "orange", "value": "PMID: 25105952", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "23135282", "conceptBorderColor": "black", "displayValue": "PMID: 23135282", "conceptBorderWidth": "1px", "id": "36", "annotation": "", "conceptColor": "orange", "value": "PMID: 23135282", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "10518493;PMID: 10518493", "conceptBorderColor": "black", "displayValue": "PMID: 10518493", "conceptBorderWidth": "1px", "id": "37", "annotation": "[FUNCTION]", "conceptColor": "orange", "value": "PMID: 10518493", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "18587275;PMID: 18587275", "conceptBorderColor": "black", "displayValue": "PMID: 18587275", "conceptBorderWidth": "1px", "id": "42", "annotation": "", "conceptColor": "orange", "value": "PMID: 18587275", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "18388858;PMID: 18388858", "conceptBorderColor": "black", "displayValue": "PMID: 18388858", "conceptBorderWidth": "1px", "id": "43", "annotation": "", "conceptColor": "orange", "value": "PMID: 18388858", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "11118137;PMID: 11118137", "conceptBorderColor": "black", "displayValue": "PMID: 11118137", "conceptBorderWidth": "1px", "id": "40", "annotation": "", "conceptColor": "orange", "value": "PMID: 11118137", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "16258016", "conceptBorderColor": "black", "displayValue": "PMID: 16258016", "conceptBorderWidth": "1px", "id": "41", "annotation": "", "conceptColor": "orange", "value": "PMID: 16258016", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "16854975;PMID: 16854975", "conceptBorderColor": "black", "displayValue": "PMID: 16854975", "conceptBorderWidth": "1px", "id": "46", "annotation": "[INTERACTION WITH SPA1; SPA2; SPA3 AND SPA4,  MUTAGENESIS OF 214-VAL-PRO-215; 265-VAL-PRO-266 AND 370-VAL-PRO-371]", "conceptColor": "orange", "value": "PMID: 16854975", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "26801684;PMID: 26801684", "conceptBorderColor": "black", "displayValue": "PMID: 26801684", "conceptBorderWidth": "1px", "id": "47", "annotation": "", "conceptColor": "orange", "value": "PMID: 26801684", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "24127609", "conceptBorderColor": "black", "displayValue": "PMID: 24127609", "conceptBorderWidth": "1px", "id": "44", "annotation": "", "conceptColor": "orange", "value": "PMID: 24127609", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "15155885;PMID: 15155885", "conceptBorderColor": "black", "displayValue": "PMID: 15155885", "conceptBorderWidth": "1px", "id": "45", "annotation": "[INTERACTION WITH SPY]", "conceptColor": "orange", "value": "PMID: 15155885", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "10743655;PMID: 10743655", "conceptBorderColor": "black", "displayValue": "PMID: 10743655", "conceptBorderWidth": "1px", "id": "51", "annotation": "[INTERACTION WITH APRR1; AIP2; AIP3 AND AIP4]", "conceptColor": "orange", "value": "PMID: 10743655", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "16839183", "conceptBorderColor": "black", "displayValue": "PMID: 16839183", "conceptBorderWidth": "1px", "id": "50", "annotation": "", "conceptColor": "orange", "value": "PMID: 16839183", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000164", "conceptBorderColor": "black", "displayValue": "stress trait", "conceptBorderWidth": "1px", "id": "49", "annotation": "Response by the plant in terms of resistivity or sensitivity to either the biotic or the abiotic types of stress. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "stress trait", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000339", "conceptBorderColor": "black", "displayValue": "stem thickness", "conceptBorderWidth": "1px", "id": "48", "annotation": "Thickness of the stem. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "stem thickness", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000168", "conceptBorderColor": "black", "displayValue": "abiotic stress trait", "conceptBorderWidth": "1px", "id": "55", "annotation": "Response by the plant in terms of resistivity or sensitivity to abiotic stress. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "abiotic stress trait", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000576", "conceptBorderColor": "black", "displayValue": "stem length", "conceptBorderWidth": "1px", "id": "54", "annotation": "A stem morphology trait (TO: 0000361) which is the length of the stem (PO: 0009047). ( Reference:  GR: pj37 PO: 0009047 TO: moorel )", "conceptColor": "greenYellow", "value": "stem length", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000587", "conceptBorderColor": "black", "displayValue": "endosperm quality", "conceptBorderWidth": "1px", "id": "53", "annotation": "A seed quality trait (TO: 0000931) which is the quality of the endosperm (PO: 0009089) texture,  content,  composition,  size,  etc. ( Reference:  GR: pj PO: 0009089 )", "conceptColor": "greenYellow", "value": "endosperm quality", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000207", "conceptBorderColor": "black", "displayValue": "plant height", "conceptBorderWidth": "1px", "id": "52", "annotation": "A whole plant morphology trait (TO: 0000398) which is the height of a whole plant (PO: 0000003). ( Reference:  ICIS: 1006 IRRI: SES PO: 0000003 TO: cooperl )", "conceptColor": "greenYellow", "value": "plant height", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0006036", "conceptBorderColor": "black", "displayValue": "stem elongation", "conceptBorderWidth": "1px", "id": "59", "annotation": "Elongation of the stem. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "stem elongation", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000615", "conceptBorderColor": "black", "displayValue": "abscisic acid sensitivity", "conceptBorderWidth": "1px", "id": "58", "annotation": "Response with respect to application of abscisic acid. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "abscisic acid sensitivity", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0002641", "conceptBorderColor": "black", "displayValue": "acid detergent fiber", "conceptBorderWidth": "1px", "id": "57", "annotation": "The percentage of highly indigestible or slowly digestible fiber in a feed or forage. Acid detergent fiber contains cellulose as well as silica and lignin which are associated with low digestibility. ( Reference:  GR: pj GrainGenes_trait: Acid_Detergent_Fiber web: http\\: \/\/www.foragetesting.org\/lab_procedure\/sectionB\/4\/part4.1.htm )", "conceptColor": "greenYellow", "value": "acid detergent fiber", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000137", "conceptBorderColor": "black", "displayValue": "days to heading", "conceptBorderWidth": "1px", "id": "56", "annotation": "Number of days required for the inflorescence (head cob panicle) to emerge from the flag leaf of a plant or a group of plants in a study. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "days to heading", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000145", "conceptBorderColor": "black", "displayValue": "internode length", "conceptBorderWidth": "1px", "id": "63", "annotation": "Measurement of length of the internode. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "internode length", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0002639", "conceptBorderColor": "black", "displayValue": "shoot branching", "conceptBorderWidth": "1px", "id": "62", "annotation": "", "conceptColor": "greenYellow", "value": "shoot branching", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0002637", "conceptBorderColor": "black", "displayValue": "leaf size", "conceptBorderWidth": "1px", "id": "61", "annotation": "A leaf morphology trait (TO: 0000748) which is the size of a leaf (PO: 0025034). ( Reference:  GR: pj PO: 0025034 TO: cooperl )", "conceptColor": "greenYellow", "value": "leaf size", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000698", "conceptBorderColor": "black", "displayValue": "starchiness", "conceptBorderWidth": "1px", "id": "60", "annotation": "", "conceptColor": "greenYellow", "value": "starchiness", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0006017", "conceptBorderColor": "black", "displayValue": "meristem identity", "conceptBorderWidth": "1px", "id": "68", "annotation": "Trait to determine the variation or effect on the establishment of meristem identity or determinacy. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "meristem identity", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0020097", "conceptBorderColor": "black", "displayValue": "stomatal opening", "conceptBorderWidth": "1px", "id": "69", "annotation": "A trait to measure the physiological parameters involved in the process of opening of stomatal pores. ( Reference:  GR: pj TO: contributors )", "conceptColor": "greenYellow", "value": "stomatal opening", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0006001", "conceptBorderColor": "black", "displayValue": "SALTTL", "conceptBorderWidth": "1px", "id": "70", "annotation": "Tolerance to the high salt content in the growth medium. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "SALTTL", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000286", "conceptBorderColor": "black", "displayValue": "submergence sensitivity", "conceptBorderWidth": "1px", "id": "71", "annotation": "Measure of sensitivity of a plant if placed under submergence condition. ( Reference:  ICIS: 1215 IRRI: SES )", "conceptColor": "greenYellow", "value": "submergence sensitivity", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0006019", "conceptBorderColor": "black", "displayValue": "floral organ identity", "conceptBorderWidth": "1px", "id": "64", "annotation": "Trait associated with observing effects on the establishment of floral organ identity. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "floral organ identity", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0006018", "conceptBorderColor": "black", "displayValue": "organ identity", "conceptBorderWidth": "1px", "id": "65", "annotation": "Trait associated with observing effects on the establishment of organ identity. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "organ identity", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000700", "conceptBorderColor": "black", "displayValue": "fruit sweetness", "conceptBorderWidth": "1px", "id": "66", "annotation": "The quality of having the pleasant taste characteristic of sugar. ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "fruit sweetness", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait Ontology", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "TO: 0000437", "conceptBorderColor": "black", "displayValue": "male sterility", "conceptBorderWidth": "1px", "id": "67", "annotation": "In plants,  it represents the incompetence of the pollen to fertilize the ovum. Reasons could be non-viable pollen,  incompatibility,  pollen abortion,  toxicity,  genetic etc. Usually determined by either the pollen sterility or spikelet fertility (percent seed set). ( Reference:  GR: pj )", "conceptColor": "greenYellow", "value": "male sterility", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Cellular_Component", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0005634", "conceptBorderColor": "black", "displayValue": "nucleus", "conceptBorderWidth": "1px", "id": "76", "annotation": "A membrane-bounded organelle of eukaryotic cells in which chromosomes are housed and replicated. In most cells,  the nucleus contains all of the cell's chromosomes except the organellar chromosomes,  and is the site of RNA synthesis and processing. In some species,  or in specialized cell types,  RNA metabolism or DNA replication may be absent. ( Reference:  GOC: go_curators )", "conceptColor": "springGreen", "value": "nucleus", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Molecular_Function", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0003677", "conceptBorderColor": "black", "displayValue": "DNA binding", "conceptBorderWidth": "1px", "id": "77", "annotation": "Any molecular function by which a gene product interacts selectively and non-covalently with DNA (deoxyribonucleic acid). ( Reference:  GOC: dph GOC: jl GOC: tb GOC: vw )", "conceptColor": "purple", "value": "DNA binding", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Molecular_Function", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0005515", "conceptBorderColor": "black", "displayValue": "protein binding", "conceptBorderWidth": "1px", "id": "78", "annotation": "Interacting selectively and non-covalently with any protein or protein complex (a complex of two or more proteins that may include other nonprotein molecules). ( Reference:  GOC: go_curators )", "conceptColor": "purple", "value": "protein binding", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Molecular_Function", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0003700", "conceptBorderColor": "black", "displayValue": "sequence-specific DNA binding...", "conceptBorderWidth": "1px", "id": "79", "annotation": "Interacting selectively and non-covalently with a specific DNA sequence in order to modulate transcription. The transcription factor may or may not also interact selectively with a protein or macromolecular complex. ( Reference:  GOC: curators GOC: txnOH )", "conceptColor": "purple", "value": "sequence-specific DNA binding transcription factor", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0006351", "conceptBorderColor": "black", "displayValue": "DNA-dependent transcription", "conceptBorderWidth": "1px", "id": "72", "annotation": "The cellular synthesis of RNA on a template of DNA. ( Reference:  GOC: jl GOC: txnOH )", "conceptColor": "teal", "value": "DNA-dependent transcription", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0006355", "conceptBorderColor": "black", "displayValue": "regulation of transcription,  ...", "conceptBorderWidth": "1px", "id": "73", "annotation": "Any process that modulates the frequency,  rate or extent of cellular DNA-templated transcription. ( Reference:  GOC: go_curators GOC: txnOH )", "conceptColor": "teal", "value": "regulation of transcription,  DNA-dependent", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0010218", "conceptBorderColor": "black", "displayValue": "response to far red light", "conceptBorderWidth": "1px", "id": "74", "annotation": "Any process that results in a change in state or activity of a cell or an organism (in terms of movement,  secretion,  enzyme production,  gene expression,  etc.) as a result of far red light stimulus. Far red light is electromagnetic radiation of wavelength 700-800nm. An example of this response is seen at the beginning of many plant species developmental stages. These include germination,  and the point when cotyledon expansion is triggered. In certain species these processes take place in response to absorption of red light by the pigment molecule phytochrome,  but the signal can be reversed by exposure to far red light. During the initial phase the phytochrome molecule is only present in the red light absorbing form,  but on absorption of red light it changes to a far red light absorbing form,  triggering progress through development. An immediate short period of exposure to far red light entirely returns the pigment to its initial state and prevents triggering of the developmental process. A thirty minute break between red and subsequent far red light exposure renders the red light effect irreversible,  and development then occurs regardless of whether far red light exposure subsequently occurs. ( Reference:  GOC: mtg_far_red GOC: tb )", "conceptColor": "teal", "value": "response to far red light", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0030154", "conceptBorderColor": "black", "displayValue": "cell differentiation", "conceptBorderWidth": "1px", "id": "75", "annotation": "The process in which relatively unspecialized cells,  e.g. embryonic or regenerative cells,  acquire specialized structural and or functional features that characterize the cells,  tissues,  or organs of the mature organism or some other relatively stable phase of the organism's life history. Differentiation includes the processes involved in commitment of a cell to a specific fate and its subsequent development to the mature state. ( Reference:  ISBN: 0198506732 )", "conceptColor": "teal", "value": "cell differentiation", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0009909", "conceptBorderColor": "black", "displayValue": "regulation of flower developm...", "conceptBorderWidth": "1px", "id": "85", "annotation": "Any process that modulates the frequency,  rate or extent of flower development. ( Reference:  GOC: go_curators )", "conceptColor": "teal", "value": "regulation of flower development", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0009908", "conceptBorderColor": "black", "displayValue": "flower development", "conceptBorderWidth": "1px", "id": "84", "annotation": "The process whose specific outcome is the progression of the flower over time,  from its formation to the mature structure. The flower is the reproductive structure in a plant,  and its development begins with the transition of the vegetative or inflorescence meristem into a floral meristem. ( Reference:  GOC: tb ISBN: 0879015322 )", "conceptColor": "teal", "value": "flower development", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0010018", "conceptBorderColor": "black", "displayValue": "far red signaling pathway", "conceptBorderWidth": "1px", "id": "87", "annotation": "The series of molecular signals initiated upon sensing of far red light by a photoreceptor molecule. Far red light is electromagnetic radiation of wavelength 700-800nm. An example of this response is seen at the beginning of many plant species developmental stages. These include germination,  and the point when cotyledon expansion is triggered. In certain species these processes take place in response to absorption of red light by the pigment molecule phytochrome,  but the signal can be reversed by exposure to far red light. During the initial phase the phytochrome molecule is only present in the red light absorbing form,  but on absorption of red light it changes to a far red light absorbing form,  triggering progress through development. An immediate short period of exposure to far red light entirely returns the pigment to its initial state and prevents triggering of the developmental process. A thirty minute break between red and subsequent far red light exposure renders the red light effect irreversible,  and development then occurs regardless of whether far red light exposure subsequently occurs. ( Reference:  GOC: lr GOC: mtg_far_red GOC: sm )", "conceptColor": "teal", "value": "far red signaling pathway", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Biological_Process", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "GO: 0007623", "conceptBorderColor": "black", "displayValue": "circadian rhythm", "conceptBorderWidth": "1px", "id": "86", "annotation": "Any biological process in an organism that recurs with a regularity of approximately 24 hours. ( Reference:  GOC: bf GOC: go_curators )", "conceptColor": "teal", "value": "circadian rhythm", "conceptTextBGcolor": "black", "conceptShape": "pentagon", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "SNP", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "ENSVATH00708892", "conceptBorderWidth": "1px", "id": "81", "annotation": "", "conceptColor": "teal", "value": "ENSVATH00708892", "conceptTextBGcolor": "black", "conceptShape": "star", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "Seedling Growth", "conceptBorderWidth": "1px", "id": "80", "annotation": "", "conceptColor": "greenYellow", "value": "Seedling Growth", "conceptTextBGcolor": "black", "conceptShape": "triangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "Secondary Dormancy", "conceptBorderWidth": "1px", "id": "83", "annotation": "", "conceptColor": "greenYellow", "value": "Secondary Dormancy", "conceptTextBGcolor": "black", "conceptShape": "triangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "SNP", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "ENSVATH00708884", "conceptBorderWidth": "1px", "id": "82", "annotation": "", "conceptColor": "teal", "value": "ENSVATH00708884", "conceptTextBGcolor": "black", "conceptShape": "star", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "Width 16", "conceptBorderWidth": "1px", "id": "93", "annotation": "", "conceptColor": "greenYellow", "value": "Width 16", "conceptTextBGcolor": "black", "conceptShape": "triangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "Se82", "conceptBorderWidth": "1px", "id": "92", "annotation": "", "conceptColor": "greenYellow", "value": "Se82", "conceptTextBGcolor": "black", "conceptShape": "triangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Trait", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "Emwa1", "conceptBorderWidth": "1px", "id": "94", "annotation": "", "conceptColor": "greenYellow", "value": "Emwa1", "conceptTextBGcolor": "black", "conceptShape": "triangle", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "SNP", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "ENSVATH00708882", "conceptBorderWidth": "1px", "id": "89", "annotation": "", "conceptColor": "teal", "value": "ENSVATH00708882", "conceptTextBGcolor": "black", "conceptShape": "star", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Publication", "flagged": "false", "conceptSize": "26px", "conceptBorderStyle": "solid", "pid": "23482857", "conceptBorderColor": "black", "displayValue": "PMID: 23482857", "conceptBorderWidth": "1px", "id": "88", "annotation": "[FUNCTION,  INTERACTION WITH GAI; RGA; RGL1; RGL2 AND RGL3,  DISRUPTION PHENOTYPE]", "conceptColor": "orange", "value": "PMID: 23482857", "conceptTextBGcolor": "black", "conceptShape": "rectangle", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "SNP", "flagged": "false", "conceptSize": "18px", "conceptBorderStyle": "solid", "pid": "", "conceptBorderColor": "black", "displayValue": "ENSVATH00708893", "conceptBorderWidth": "1px", "id": "91", "annotation": "", "conceptColor": "teal", "value": "ENSVATH00708893", "conceptTextBGcolor": "black", "conceptShape": "star", "conceptDisplay": "none", "conceptTextBGopacity": "0"}, "group": "nodes"}, {"data": {"conceptType": "Protein", "flagged": "false", "conceptSize": "22px", "conceptBorderStyle": "solid", "pid": "Q9FHE4", "conceptBorderColor": "black", "displayValue": "BOI-related E3 ubiquitin-prot...", "conceptBorderWidth": "1px", "id": "90", "annotation": "Created:  2013-12-11; Modified:  2016-07-06; Version:  113", "conceptColor": "red", "value": "BOI-related E3 ubiquitin-protein ligase 1", "conceptTextBGcolor": "black", "conceptShape": "ellipse", "conceptDisplay": "element", "conceptTextBGopacity": "0"}, "group": "nodes"}]};
    var graphMapId2type = {};
    for (var i = 0; i < graph.nodes.length; i++) {
        var n = graph.nodes[i].data;
        graphMapId2type[n.id] = n.conceptType;
        if (n.conceptType in this.CONCEPT_TYPES) {
            this.KNETMAPS_STYLES.conceptStyle[n.conceptType] = new ConceptTypeStyle(this.CONCEPT_TYPES[n.conceptType],
                    n.conceptBorderColor, n.conceptSize, n.conceptTextBGopacity, n.conceptDisplay, n.conceptColor,
                    n.conceptBorderStyle, n.conceptBorderWidth, n.conceptShape, n.conceptTextBGcolor);
        }
    }
    for (var i = 0; i < graph.edges.length; i++) {
        var e = graph.edges[i].data;
        if (graphMapId2type[e.source] in this.CONCEPT_TYPES && graphMapId2type[e.target] in this.CONCEPT_TYPES) {
            var relationName = graphMapId2type[e.source] + "-" + e.label + "-" + graphMapId2type[e.target],
                    relationColor = e.relationColor, relationSize = e.relationSize;
            this.KNETMAPS_STYLES.relationStyle[relationName] = new RelationTypeStyle(relationName, relationColor, relationSize);
        }
    }

    //console.log("this.KNETMAPS_STYLES: " + JSON.stringify(this.KNETMAPS_STYLES));

    this.generateConceptId = function () {
        this.nextId++;
        return this.nextId;
    };

    this.extractConceptTypeName = function (typeURI) {
        var conceptTypeName = getIRILocalname(typeURI);
        if (conceptTypeName === "Metabolic_Pathway") {
            conceptTypeName = "Pathway";
        }
        return conceptTypeName;
    };

    this.processDescribe = function (conceptURI, entityData) {
        this.entitiesUnprocessedLinks[conceptURI] = [];
        var id, annotation = "", elementOf = new Set(), description = "", pid = "",
                //value = getPrefixedFormOfURI(conceptURI),
                value = getIRILocalname(conceptURI),
                conceptType, evidences = "Imported from AgroLD", conames = [], coaccessions = [], attributes = [];
        attributes.push(new Attribute("visible", "true"));
        attributes.push(new Attribute("flagged", "true"));

        if (this.mapConceptURI2Id[conceptURI] === undefined) {
            id = this.generateConceptId();
            this.mapConceptURI2Id[conceptURI] = id;
        } else {
            id = this.mapConceptURI2Id[conceptURI];
        }

        for (var i = 0; i < entityData.length; i++) {
            var _graph = getIRILocalname(entityData[i].graph);
            var _property = entityData[i].property;
            var _hasValue = entityData[i].hasValue;
            var _isValueOf = entityData[i].isValueOf;
            var _type = getIRILocalname(entityData[i].type);
            var relationName = getIRILocalname(_property);
            switch (relationName) {
                case "type":
                    conceptType = this.CONCEPT_TYPES[this.extractConceptTypeName(_hasValue)];
                    break;
                case "label":
                case "has_synonym":
                    conames.push(_hasValue);
                    break;
                case "description":
                    description = _hasValue;
                case "comment":
                    annotation += _hasValue + " ";
                case "seeAlso":
                case "has_dbsref":
                    coaccessions.push(new Coaccession(_graph, _hasValue));
                default:
                    if (_type !== null && _type !== undefined && _type !== "") {
                        if (_type in this.CONCEPT_TYPES) {
                            var linkToAnotherConcept = {};
                            linkToAnotherConcept.property = _property;
                            linkToAnotherConcept.hasValue = _hasValue;
                            linkToAnotherConcept.isValueOf = _isValueOf;
                            linkToAnotherConcept.type = _type;
                            this.entitiesUnprocessedLinks[conceptURI].push(linkToAnotherConcept);
                        }
                    } else if (_isValueOf === "") {
                        attributes.push(new Attribute(getPrefixedFormOfURI(_property), getPrefixedFormOfURI(_hasValue)));
                    }
            }
            elementOf.add(_graph);
        }
        elementOf = Array.from(elementOf).join(': ');
        var c = new Concept(id.toString(), annotation, elementOf, description, pid, value, conceptType, evidences); // entityConcept
        for (var j = 0; j < conames.length; j++) {
            c.addConame(conames[j]);
        }
        for (var j = 0; j < coaccessions.length; j++) {
            c.addCoaccession(coaccessions[j]);
        }
        for (var j = 0; j < attributes.length; j++) {
            c.addAttribute(attributes[j]);
        }
        this._allGraphData.addConcept(c);
        this.mapConceptURI2Concept[conceptURI] = c;

        var nd = new NodeData(id.toString(), pid, value, "true", value, annotation, this.KNETMAPS_STYLES.conceptStyle[conceptType.getName()]);
        var n = new Node("nodes", nd); // entity node
        this._graphJSON.addNode(n);

        return entityData;
    };

    this.fetchConceptDescription = function (conceptURI) {
        var tthis = this;
        return $.getJSON(tthis.describeBaseURL + conceptURI, function (conceptData) {
            tthis.processDescribe(conceptURI, conceptData);
        });
    };

    this.processLink = function (conceptURI, link) {
        var sourceURI, targetURI;
        var linkURI = link.hasValue === "" ? link.isValueOf : link.hasValue;
        if (link.hasValue === "") {
            sourceURI = linkURI;
            targetURI = conceptURI;
        } else {
            sourceURI = conceptURI;
            targetURI = linkURI;
        }
        // add relation                            
        var rName = getIRILocalname(link.property),
                toConcept = this.mapConceptURI2Concept[targetURI],
                fromConcept = this.mapConceptURI2Concept[sourceURI],
                ofType = rName, evidences = "from_AgroLD", context = "",
                rId = this.mapConceptURI2Concept[sourceURI].id + "-" + this.mapConceptURI2Concept[targetURI].id;
        var r = new Relation(rId, toConcept, fromConcept, ofType, evidences, context);
        this._allGraphData.addRelation(r);
        // add relation type 
        var sourceType = this.mapConceptURI2Concept[sourceURI].ofType;
        var targetType = this.mapConceptURI2Concept[targetURI].ofType;
        var relationTypeId = sourceType + "-" + rName + "-" + targetType; // concat sourceTyep+relation+targetType
        this.RELATION_TYPES[relationTypeId] = new RelationType(rName, sourceType, targetType);
        // add edge
        var sourceNode = fromConcept.getId(), targetNode = toConcept.getId(),
                relationDisplay = "element";
        var eData = new EdgeData(sourceNode, targetNode, relationDisplay, r, this.KNETMAPS_STYLES.relationStyle[relationTypeId]),
                e = new Edge("edges", eData);
        this._graphJSON.addEdge(e);

    };

    this.fetchConceptRelations = function (conceptURI) {        
        var jqxhr;var tthis = this;        
        for (var i = 0 ; i < this.entitiesUnprocessedLinks[conceptURI].length; i++) { 
            (function(i){                
            var link = tthis.entitiesUnprocessedLinks[conceptURI][i];
            var otherConceptURI = link.hasValue === "" ? link.isValueOf : link.hasValue;
            jqxhr = $.getJSON(tthis.describeBaseURL + otherConceptURI, function (otherConceptData) {
                 tthis.processDescribe(otherConceptURI, otherConceptData);
                 //console.log("tthis.mapConceptURI2Concept: " + JSON.stringify(tthis.mapConceptURI2Concept));
                 console.log("jo");
                 tthis.processLink(conceptURI, link);
            });
        console.log("i:" + i);
            })(i);
        
        };                 
        return jqxhr;
    };

    this.updateNetwork = function () {
        graphJSON = JSON.parse(JSON.stringify(this._graphJSON)); // since KnetMaps.js understand only the JSON format, it necessary to convert the objet into JSON
        allGraphData = {"ondexmetadata": JSON.parse(JSON.stringify(this._allGraphData))};
        //console.log("allGraphData: " + JSON.stringify(allGraphData));
        console.log("graphJSON: " + JSON.stringify(graphJSON));

        //KNETMAPS.KnetMaps().draw("#knet-maps");
    };
}