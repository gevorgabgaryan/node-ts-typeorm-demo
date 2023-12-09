import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import controllers from '../controllers';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { ReferenceObject, SchemaObject } from 'openapi3-ts';
import { getMetadataStorage } from 'class-validator';

export async function openAPISpec() {
  const routingControllersOptions: RoutingControllersOptions = {
    controllers,
  };

  const storage = getMetadataArgsStorage();

  // Convert classes to JSON schema

  const schemas: { [schema: string]: ReferenceObject | SchemaObject } =
    validationMetadatasToSchemas({
      classValidatorMetadataStorage: getMetadataStorage(),
      refPointerPrefix: '#/components/schemas/',
    }) as { [schema: string]: ReferenceObject | SchemaObject };

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
