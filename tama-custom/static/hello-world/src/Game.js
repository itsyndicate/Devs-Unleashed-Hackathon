import React, {useEffect, useRef, useState} from 'react';
import {requestJira} from '@forge/bridge';
import {Image, ProgressBar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Game.css';
import {Character} from "./character";
import {PopUpEdit, PopUpFeed, PopUpFight} from "./PopUp";
import e from './assets/e.wav';
import buttonSound from './assets/buttons.wav'
//icons
import {MdOutlineHealthAndSafety} from 'react-icons/md';
import {BiTime} from 'react-icons/bi';
import CharRating from './Rating';
import WaitingRoom from "./Components/GameFolder/WaitingRoom";

const AsyncReq = async () => {
    const response = await requestJira('/rest/api/3/groups/picker');
    console.log(await response.text());
}
// Components
const TamagoshiImage = ({strength, health}) => {
    let tamagoshiImage = 'project_example_1.png';
    return <Image style={{maxWidth: "350px", maxHeight: "300px"}} src={tamagoshiImage} alt="Tamagoshi"/>;
}


export const Game = () => {


    let timer = null;
    const [direction, setDirection] = useState('left');
    const [containerWidth, setContainerWidth] = useState(100);
    const [charRating, setCharRating] = useState(1);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState(0)
    let [strength, setStrength] = useState(0);
    const [health, setHealth] = useState(0);
    let [costume, setCostume] = useState("");
    let [hat, setHat] = useState("");
    let [weapon, setWeapon] = useState("");
    // const [record, setRecord] = useState(0);
    const [showGif, setShowGif] = useState(false);
    const [gif, setGif] = useState(null);

    const playE = () => {
        const audio = new Audio(e)
        audio.play();
    };
    const getUsers = async () => {
        const response = (await requestJira('/rest/api/3/users/search?'));
        const data = await response.json();
        setUsers(data[0].accountId)
        return (data[0].accountId);
    }
    const getTasks = async () => {
        const response = await requestJira('/rest/api/2/search?jql=status+in+%28+done%29+order+by+status')
            .then(res => res.json())
            .then(res => setTasks(res['total']))
    }

    const [jiraUserID, setJiraUserID] = useState('')
    const [jiraUserName, setJiraUserName] = useState('')
    const [jiraProjectID, setJiraProjectID] = useState('')
    const [jiraProjectName, setJiraProjectName] = useState('')
    const getJiraInfo = async () => {
        await requestJira('/rest/api/3/users/search?')
            .then(res => res.json())
            .then(res => setJiraUserID(res[0].accountId))

        await requestJira('/rest/api/3/users/search?')
            .then(res => res.json())
            .then(res => setJiraUserName(res[0].displayName))

        await requestJira('/rest/api/2/project')
            .then(res => res.json())
            .then(res => setJiraProjectName(res[0].name))

        await requestJira('/rest/api/2/project')
            .then(res => res.json())
            .then(res => setJiraProjectID(res[0].id))
    }
    getJiraInfo()

    const getProject = async () => {
        const response = (await requestJira('/rest/api/3/project'));
        const data = await response.json();
        return (data[0].id);
    }

    async function getHealth(userID, projectID) {
        // const userID = await getUsers();
        const response = await fetch(`https://backend.guard-lite.com/api/v1/taskogotchi?account_id=${userID}&project_id=${projectID}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });


        const result = await response.json();
        console.log(result["health"]);
        return result["health"];
    }

    async function getStrength(userID, projectID) {
        // const userID = await getUsers();
        const response = await fetch(`https://backend.guard-lite.com/api/v1/taskogotchi?account_id=${userID}&project_id=${projectID}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });


        const result = await response.json();
        console.log(strength);
        return result["strength"];
    }

    async function getTama() {
        const userID = await getUsers();
        const projectId = await getProject();

        // const userID = await getUsers();
        const response = await fetch(`https://backend.guard-lite.com/api/v1/taskogotchi?account_id=${userID}&project_id=${projectId}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });


        const result = await response.json();
        console.log(result["image"]);
        setHat(result["image"].hatImg)
        setCostume(result["image"].costumeImg)
        setWeapon(result["image"].weaponImg)
    }

    const checkHealth = async () => {
        const userID = await getUsers();
        const projectId = await getProject();
        setHealth(await getHealth(userID, projectId));
        setStrength(await getStrength(userID, projectId));
        useInterval(async () => {
            setHealth(await getHealth(userID));
        }, 60000);

    }

    checkHealth();
    getTama();
    const [isFightVisible, setIsFightVisible] = useState(false);
    const [isFeedVisible, setIsFeedVisible] = useState(false);
    const [isFightGameVisible, setIsFightGameVisible] = useState(false);
    const toggleEdit = () => {
        const audio = new Audio(buttonSound)
        audio.play();
        setIsEditVisible(!isEditVisible);
    }

    const toggleFight = () => {
        const audio = new Audio(buttonSound)
        audio.play();
        setIsFightVisible(!isFightVisible)
        getUsers();
    }
    const toggleFightGame = () => {
        setIsFightGameVisible(!isFightGameVisible)
    }
    const toggleFeed = () => {
        const audio = new Audio(buttonSound)
        audio.play();
        setIsFeedVisible(!isFeedVisible)
        getTasks();
    }

    function startMove() {
        timer = setInterval(() => {
            setDirection(direction === 'right' ? 'left' : 'right');
            setContainerWidth(Math.floor(Math.random() * 101));
        }, 1200)

    }

    function stopMove() {
        clearTimeout(timer);
    }

    return (
        <div className="egg">
            <h2 className="character-age">Tasks Eaten: {tasks}</h2>

            <div className="stats">
                <Image className="stat-icons" src={"strength.svg"}/>
                <ProgressBar now={strength} className="stat-progress" variant="danger" label={`${strength}%`}/>
                <Image className="stat-icons" style={{marginTop: "10px"}} src={"game-icons_health-potion.svg"}/>
                <ProgressBar now={health} style={{marginTop: "10px"}} className="stat-progress" variant="success"
                             label={`${health}%`}/>
            </div>
            <div className="square" style={{width: containerWidth + '%'}}>
                {/*COMMENT FOR MOVING CHARACTER*/}
                {/*<div className={'square-content ' + direction} id="character">*/}
                <div className='square-content' id="character">
                    <div className="editAndFight">
                        {isEditVisible && < PopUpEdit toggleLogin={toggleEdit}/>}
                        {/*</StyledEngineProvider>*/}
                        <button className="editButton" onClick={toggleEdit}><img src="edit.svg"
                                                                                 className="edit-img"/>

                        </button>
                        {isFightVisible && <PopUpFight
                            users={users}
                            jiraUserId={jiraUserID}
                            jiraProjectID={jiraProjectID}
                            toggleFight={toggleFight}
                            toggleFightGame={toggleFightGame}
                        />}
                        <button className="fight" onClick={toggleFight}>
                            <img draggable="false" src="fight.png" className="fight-img"/>
                        </button>
                    </div>
                    {/*<StyledEngineProvider injectFirst>*/}
                    {/* Show the GIF if showGif is true and show the tamagoshi if showGif is false */}
                    {/*{showGif ? <img draggable="false" className='gif' src={gif} alt="Gif"/> :*/}
                    <Character costumeImg1={costume}
                               hatImg1={hat}
                               weaponImg1={weapon}/>
                    <button className="feed" onClick={toggleFeed}>
                        <img draggable="false" src="cat-food.svg" className="feed-img"/>
                    </button>
                </div>
                {isFightGameVisible && <WaitingRoom/>}

                {isFeedVisible && <PopUpFeed tasks={tasks} toggleFeed={toggleFeed}/>}

            </div>


        </div>
    )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}