import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import controllers from '../controllers';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataStorage } from 'class-validator';

export async function openAPISpec() {
  const routingControllersOptions: RoutingControllersOptions = {
    controllers,
  };

  const storage = getMetadataArgsStorage();

  const schemas: any =
    validationMetadatasToSchemas({
      classValidatorMetadataStorage: getMetadataStorage(),
      refPointerPrefix: '#/components/schemas/',
    });

  const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: {
      schemas
    },
    info: {
      description: 'Generated with `routing-controllers-openapi`',
      title: 'API',
      version: '1.0.0',
    },
    storage,
  });

  return spec;
}
