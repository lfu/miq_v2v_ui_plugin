export const sourceDatastoreFilter = (
  datastoresToFilter,
  datastoreStepMappings
) => {
  const mappedDatastores = datastoreStepMappings.reduce(
    (mappedDatastoresArray, targetClusterDatastoreMappings) => {
      const sourceDatastores = targetClusterDatastoreMappings.nodes.reduce(
        (datastores, datastoreMapping) =>
          datastores.concat(datastoreMapping.nodes),
        []
      );
      return mappedDatastoresArray.concat(sourceDatastores);
    },
    []
  );

  return datastoresToFilter.filter(
    datastore =>
      !mappedDatastores.some(
        mappedDatastore => mappedDatastore.id === datastore.id
      )
  );
};

export const targetDatastoreFilter = (
  datastoresToFilter,
  datastoreStepMappings
) => {
  const mappedDatastores = datastoreStepMappings.reduce(
    (mappedDatastoresArray, targetClusterDatastoreMappings) =>
      mappedDatastoresArray.concat(targetClusterDatastoreMappings.nodes),
    []
  );
  return datastoresToFilter.filter(
    datastore =>
      !mappedDatastores.some(
        mappedDatastore => mappedDatastore.id === datastore.id
      )
  );
};
