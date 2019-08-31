import React from 'react'
import { Card, CardBody, CardText, CardHeader, CardImg, Button } from 'reactstrap'

const Champion = ({ champion }) => {
    return (
        <div>
            <Card className="shadow-sm">
                <CardHeader>{champion.name}</CardHeader>
                <CardImg src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`} />
                <CardBody>
                    <CardText>0 Votes</CardText>
                    <Button className="w-100">Vote</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default Champion