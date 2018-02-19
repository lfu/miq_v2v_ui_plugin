import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, bindMethods } from 'patternfly-react';

// import DualPaneMapper from '../DualPaneMapper/DualPaneMapper';
// import DualPaneMapperList from '../DualPaneMapper/DualPaneMapperList';
// import DualPaneMapperCount from '../DualPaneMapper/DualPaneMapperCount';
// import DualPaneMapperListItem from '../DualPaneMapper/DualPaneMapperListItem';

class MappingWizardDatastoresStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCluster: null, // dropdown selected cluster
      selectedTargetDatastore: null, // eslint-disable-line react/no-unused-state
      selectedSourceDatastore: [], // eslint-disable-line react/no-unused-state
      datastoreMappings: [], // eslint-disable-line react/no-unused-state
      selectedDatastoreMapping: null // eslint-disable-line react/no-unused-state
    };

    bindMethods(this, ['selectSourceCluster']);
  }

  componentDidMount() {}

  selectSourceCluster(id) {
    // when dropdown selection occurs for source cluster, we go retrieve the datastores for that
    // cluster
    const { fetchDatastoresUrl, fetchDatastoresAction } = this.props;
    fetchDatastoresAction(fetchDatastoresUrl, id);
  }

  render() {
    const {
      // todo: inject the mapped clusters from MappingWizardClustersStep as props here
      clusterMappings, // eslint-disable-line no-unused-vars
      isFetchingDatastores, // eslint-disable-line no-unused-vars
      isRejectedDatastores, // eslint-disable-line no-unused-vars
      // source/target datastores change depending on selection
      sourceDatastores, // eslint-disable-line no-unused-vars
      targetDatastores // eslint-disable-line no-unused-vars
    } = this.props;

    const {
      selectedCluster, // eslint-disable-line no-unused-vars
      selectedTargetDatastore, // eslint-disable-line no-unused-vars
      selectedSourceDatastore, // eslint-disable-line no-unused-vars
      datastoreMappings, // eslint-disable-line no-unused-vars
      selectedDatastoreMapping // eslint-disable-line no-unused-vars
    } = this.state;

    // first we render the dropdown selection for each source cluster in clusterMappings,
    // then we call `selectSourceCluster` and go get that cluster's datastores on selection

    // todo: change this Button to the source cluster populated Dropdown
    return (
      <div>
        <Button onClick={() => this.selectSourceCluster('10000000000001')}>
          Fetch Datastores
        </Button>
        {sourceDatastores.length > 0 &&
          !isFetchingDatastores && (
            <div>
              {' '}
              <h4>Source Datastores</h4>
              {sourceDatastores.map(store => (
                <div>
                  <span>{store.id}</span>
                  &nbsp;
                  <span>{store.name}</span>
                  &nbsp;
                  <span>{store.store_type}</span>
                  &nbsp;
                </div>
              ))}
            </div>
          )}
        {targetDatastores.length > 0 &&
          !isFetchingDatastores && (
            <div>
              {' '}
              <h4>Target Datastores</h4>
              {targetDatastores.map(store => (
                <div>
                  <span>{store.id}</span>
                  &nbsp;
                  <span>{store.name}</span>
                  &nbsp;
                  <span>{store.store_type}</span>
                  &nbsp;
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

MappingWizardDatastoresStep.propTypes = {
  clusterMappings: PropTypes.array,
  fetchDatastoresUrl: PropTypes.string,
  fetchDatastoresAction: PropTypes.func,
  sourceDatastores: PropTypes.arrayOf(PropTypes.object),
  targetDatastores: PropTypes.arrayOf(PropTypes.object),
  isFetchingDatastores: PropTypes.bool,
  isRejectedDatastores: PropTypes.bool
  // removeTargetDatastore: PropTypes.func,
  // removeSourceDatastore: PropTypes.func,
  // addTargetDatastore: PropTypes.func,
  // addSourceDatastore: PropTypes.func
};
MappingWizardDatastoresStep.defaultProps = {
  clusterMappings: [],
  fetchDatastoresUrl: '',
  fetchDatastoresAction: noop,
  sourceDatastores: [],
  targetDatastores: [],
  isFetchingDatastores: false,
  isRejectedDatastores: false
  // removeTargetDatastore: noop,
  // removeSourceDatastore: noop,
  // addTargetDatastore: noop,
  // addSourceDatastore: noop
};

export default MappingWizardDatastoresStep;
