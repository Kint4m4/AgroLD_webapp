/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package agrold.webservices.dao;

import java.io.IOException;

/**
 *
 * @author tagny
 */
public class PathwayDAO {

    //public static String METABOLIC_PATHWAY = "http://edamontology.org/data_1157";
    //public static String PATHWAY_IDENTIFIER = "http://semanticscience.org/resource/SIO_010532";
    //public static String METABOLIC_PATHWAY = "http://www.southgreen.fr/agrold/resource/Pathway_Identifier";
    //public static String PATHWAY_IDENTIFIER = "http://www.southgreen.fr/agrold/resource/Metabolic_Pathway";
    public static String PATHWAY_IDENTIFIER = "http://www.southgreen.fr/agrold/resource/Pathway_Identifier";
    public static String METABOLIC_PATHWAY = "http://www.southgreen.fr/agrold/vocabulary/Metabolic_Pathway";
    public static String GRAMECYC_GRAPH = "http://www.southgreen.fr/agrold/gramene.cyc";

    public static String getPathwaysByKeyWord(String keyword, int page, int pageSize, String resultFormat) throws IOException {
        /*String sparqlQuery = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>\n"
                + "SELECT distinct  ?Id ?Name (?s as ?URI)\n"
                + "WHERE {\n"
                + "  VALUES ?keyword {\n"
                + "    \"" + keyword + "\" \n"
                + "  }\n"
                + "#  graph <" + GRAMECYC_GRAPH + ">{\n"
                + "  ?s rdf:type|rdfs:subClassOf ?type.\n"
                + "  FILTER(?type IN (<" + METABOLIC_PATHWAY + ">,<" + PATHWAY_IDENTIFIER + ">))\n"
                + "    OPTIONAL {?s rdfs:label ?Name}  \n"
                + "    BIND(REPLACE(str(?s), '^.*(#|/)', \"\") AS ?Id) \n"
                + "    BIND ( CONCAT(?Name, ?Id) AS ?text)\n"
                + "    FILTER(REGEX(?text, ?keyword,\"i\"))\n"
                + "#  }\n"
                + "}";
        sparqlQuery = Utils.addLimitAndOffset(sparqlQuery, pageSize, page);

        return Utils.executeSparqlQuery(sparqlQuery, Utils.sparqlEndpointURL, resultFormat);*/
        return Utils.getEntitiesByKeyWord(keyword, new String[] {METABOLIC_PATHWAY, PATHWAY_IDENTIFIER}, page, pageSize, resultFormat);
    }

    // return  IRI and name of pathways in which an id-given gene participates
    public static String getPathwaysInWhichParticipatesGene(String geneId, int page, int pageSize, String resultFormat) throws IOException {
        String sparqlQuery = "BASE <http://www.southgreen.fr/agrold/>\n"
                + "PREFIX vocab:<vocabulary/>\n"
                + "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>\n"
                + "PREFIX graph:<gramene.cyc>\n"
                + "\n"
                + "SELECT DISTINCT ?pathwayId ?Name (?pathway AS ?IRI)\n"
                + "WHERE {\n"
                + " GRAPH graph: {\n"
                + "  ?gene vocab:is_agent_in ?pathway. \n"
                + "  ?pathway rdfs:label ?Name. \n"
                + "  BIND(REPLACE(str(?pathway), '^.*(#|/)', \"\") AS ?pathwayId) .\n"
                + "  BIND(REPLACE(str(?gene), '^.*(#|/)', \"\") AS ?geneId) .\n"
                + "  FILTER(lcase('" + geneId + "') = lcase(?geneId)).\n"
                + "  }\n"
                + "}";
        sparqlQuery = Utils.addLimitAndOffset(sparqlQuery, pageSize, page);

        return Utils.executeSparqlQuery(sparqlQuery, Utils.sparqlEndpointURL, resultFormat);
    }

    public static void main(String[] args) throws IOException {
        System.out.println(getPathwaysByKeyWord("pathway", 0, 10, ".tsv"));
    }

}
