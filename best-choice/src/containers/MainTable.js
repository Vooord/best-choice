import React, {useEffect} from 'react';
import MainTableComponent from '../components/MainTable';

import {connect} from 'react-redux';
import {compact, filter} from 'lodash';

import {updateTopics, occupyTopic} from '../actions/topic';
import {makeAuthHeader} from '../helpers/jwt';


function MainTable(props) {
    const {topics, onOccupyButtonClick, group} = props;

    useEffect(() => {
        if (!group) {
            return;
        }

        const {
            // eslint-disable-next-line no-shadow
            updateTopics,
        } = props;

        const url = `http://localhost:5000/topics/?group=${group}`;

        const fetchTopics = async () => {
            const newTopics = await fetch(url, {headers: makeAuthHeader()})
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    const data = {};
                    result.forEach(topic => {
                        const {title, adviser, owner} = topic;
                        data[title] = {
                            title,
                            adviser: adviser && compact([adviser.lastName, adviser.firstName, adviser.midName]).join(' '),
                            owner: owner && compact([owner.lastName, owner.firstName]).join(' '),
                            group,
                            ownerLogin: owner && owner.login,
                        };
                    });

                    return data;
                });
            updateTopics(newTopics);
        };
        fetchTopics();
    }, [group]);

    return (
        <MainTableComponent topics={topics} onOccupyButtonClick={onOccupyButtonClick}/>
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
    updateTopics: topics => dispatch(updateTopics(topics)),
    onOccupyButtonClick: title => console.log('onOccupyButtonClick title = ', title) || dispatch(occupyTopic(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
