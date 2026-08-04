import type { Graph, Thing, WithContext } from "schema-dts";

/**
 * The single injector for every JSON-LD block on the site.
 *
 * JSON.stringify does not escape "<", so any string containing "</script>"
 * would terminate the tag early and spill the rest of the graph into the
 * document as markup. Escaping it to < is byte-identical once parsed
 * and stays safe no matter what a future essay or footnote says.
 */
export default function JsonLd({
    data,
}: {
    data: WithContext<Thing> | Graph;
}) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, "\\u003c"),
            }}
        />
    );
}
