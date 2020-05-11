import React, {useEffect} from 'react';
import StudentMainTableComponent from '../components/StudentMainTable';

import {connect} from 'react-redux';
import {compact, filter} from 'lodash';

import {setTopics, occupyTopic} from '../actions/topic';
import {updateCurrentUser} from '../actions/user';
import {makeAuthHeader} from '../helpers/jwt';


function StudentMainTable(props) {
    const {
        topics,
        // eslint-disable-next-line no-shadow
        setTopics,
        setIntervalId,
        onOccupyButtonClick,
        group,
    } = props;


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
                            adviser: adviser && compact([adviser.lastName, adviser.firstName, adviser.midName]).join(' '),
                            owner: owner && compact([owner.lastName, owner.firstName]).join(' '),
                            ownerLogin: owner && owner.login,
                            ...restTopic,
                        };
                    });

                    return data;
                });
            setTopics(newTopics);
        }

        fetchTopics();
        setIntervalId(setInterval(fetchTopics, 1000));
    }, [group]);

    return (
        <StudentMainTableComponent
            topics={topics}
            onOccupyButtonClick={onOccupyButtonClick}
        />
    );
}

const mapStateToProps = state => {
    const {group} = state.user.current;
    const topics = filter(state.topic, topic => topic.group === group);
    return {
        topics,
        group,
    };
};

const mapDispatchToProps = dispatch => ({
    setIntervalId: intervalId => dispatch(updateCurrentUser({intervalId})),

    setTopics: topics => dispatch(setTopics(topics)),
    onOccupyButtonClick: topicId => dispatch(occupyTopic(topicId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentMainTable);
