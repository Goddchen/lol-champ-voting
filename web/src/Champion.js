import React from 'react'
import { Card, CardBody, CardText, CardHeader, CardImg, Button } from 'reactstrap'

const Champion = ({ data, currentLevel = 0, votings }) => {
    return (
        <div>
            <Card className="shadow-sm">
                <CardHeader>{data.name}</CardHeader>
                <CardImg src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.id}_0.jpg`} />
                <CardBody>
                    <CardText>
                        <p>{votings} Votes</p>
                        <p>Current Level: {currentLevel}</p>
                    </CardText>
                    <Button className="w-100">Vote</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default Champion