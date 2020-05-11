import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import AdminMainTableComponent from '../components/AdminMainTable';
import {makeAuthHeader} from '../helpers/jwt';
import {setTopics, updateTopics, addTopics, deleteTopics} from '../actions/topic';
import {updateCurrentUser} from '../actions/user';


const AdminMainTable = props => {
    // eslint-disable-next-line no-shadow
    const {topics, setTopics, updateTopics, addTopics, deleteTopics, setIntervalId} = props;

    useEffect(() => {
        async function fetchTopics() {
            const url = 'http://localhost:5000/topics/';

            const newTopics = await fetch(url, {headers: makeAuthHeader()})
                .then(response => response.json())
                .then(result => {
                    const data = {};
                    result.forEach(topic => {
                        const {_id: id, adviser, owner, ...restTopic} = topic;
                        data[id] = {
                            id,
                            adviser: (adviser && adviser.uid) || '',
                            owner: (owner && owner.login) || '',
                            ...restTopic,
                        };
                    });

                    return data;
                });
            setTopics(newTopics);
        }

        fetchTopics();
        setIntervalId(setInterval(fetchTopics, 5000));
    }, []);

    return <AdminMainTableComponent
        topics={topics}
        updateTopics={updateTopics}
        addTopics={addTopics}
        deleteTopics={deleteTopics}
    />;
};


const mapStateToProps = state => {
    const topics = Object.values(state.topic);
    return {
        state,
        topics,
    };
};

const mapDispatchToProps = dispatch => ({
    setIntervalId: intervalId => dispatch(updateCurrentUser({intervalId})),

    setTopics: topics => dispatch(setTopics(topics)),
    updateTopics: topics => dispatch(updateTopics(topics)),
    addTopics: topics => dispatch(addTopics(topics)),
    deleteTopics: topics => dispatch(deleteTopics(topics)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminMainTable);
