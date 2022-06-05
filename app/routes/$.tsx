import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import type { ComponentRenderData } from "@plasmicapp/loader-react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  PlasmicComponent,
  PlasmicRootProvider,
  extractPlasmicQueryData,
} from "@plasmicapp/loader-react";
import { PLASMIC } from "~/plasmic-init";

interface PageProps {
  plasmicData: ComponentRenderData;
  queryCache: Record<string, any>;
}

export const meta: MetaFunction = ({ data }) => {
  const plasmicData = data.plasmicData as ComponentRenderData;
  const meta = plasmicData.entryCompMetas[0].pageMetadata;

  return {
    title: meta?.title ?? "Hello World",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const routePath = params["*"] ?? "";

  try {
    const plasmicData = await PLASMIC.fetchComponentData(routePath);

    const queryCache = await extractPlasmicQueryData(
      <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
        <PlasmicComponent
          component={plasmicData.entryCompMetas[0].displayName}
        />
      </PlasmicRootProvider>
    );

    return json({
      plasmicData,
      queryCache,
    });
  } catch (err) {
    throw new Response(null, { status: 404 });
  }
};

export function CatchBoundary() {
  return <h1>404 Not Found</h1>;
}

export default function Page() {
  const { plasmicData, queryCache } = useLoaderData() as PageProps;
  const pageMeta = plasmicData.entryCompMetas[0];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <PlasmicRootProvider
        loader={PLASMIC}
        prefetchedData={plasmicData}
        prefetchedQueryData={queryCache}
      >
        <PlasmicComponent component={pageMeta.displayName} />
      </PlasmicRootProvider>
    </div>
  );
}
