import React, { useState, useEffect } from 'react';
import PublicApiManager from "../manager/public-api-manager";
import InformationCard from "./information-card";
import InformationCardInterface from "../interfaces/information-card-interface";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import CategoriesPagination from "./categories-pagination";

function PublicApiDisplay() {
    const [publicApiCards, setPublicApiCards] = useState([] as InformationCardInterface[])
    const [selectedCategory, setSelectedCategory] = useState<string>("")

    useEffect(() => {
        PublicApiManager.getEntries()
            .then(e => {
                setPublicApiCards(PublicApiManager.transformEntries(e));
            }).catch(err => {
                throw new Error(err);
            });
    }, []);

    return (
        <div>
            <Typography variant="h4">
                Public APIs
            </Typography>
            <Typography variant="subtitle2">
                <Link href="https://github.com/davemachado/public-api">Provided by Public APIs</Link>
            </Typography>
            <Typography variant="subtitle1">
                A collective list of free APIs for use in software and web development
            </Typography>

            <CategoriesPagination selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

            <Grid container spacing={3} p={3}>
                {publicApiCards && publicApiCards.map(card => (
                    <Grid item md={4}>
                        <InformationCard info={card.info} link={card.link}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
export default PublicApiDisplay;