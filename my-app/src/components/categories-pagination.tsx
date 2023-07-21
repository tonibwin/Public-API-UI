import React, {useEffect, useState} from 'react';
import PublicApiManager from "../manager/public-api-manager";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from '@material-ui/core/Button';


interface DispatchCategory {
    "selectedCategory": string;
    "setSelectedCategory": (value: string) => void;
}

function CategoriesPagination({selectedCategory, setSelectedCategory}: DispatchCategory) {
    const [offset] = useState(10)
    const [pages, setPages] = useState([] as string[][])
    const [pageNumber, setPageNumber] = useState(1)

    const outlineVariant: "outlined" = "outlined";
    const textVariant: "text" = "text";

    useEffect(() => {
        PublicApiManager.getCategories()
            .then(categories => {
                initializePagination(categories);
            }).catch(err => {
            throw new Error(err);
        });
    }, []);

    const initializePagination = function(categories: string[]) {
        let allPages = [];
        let page = [];
        let limit = offset;
        let count = 0;
        for(const category of categories) {
            if(count == limit){
                allPages.push(page);
                page = [];
                count = 0;
            }
            page.push(category);
            count++;
        }
        if(page.length > 0) {
            let remainingSlots = offset - page.length;
            for(let i = 0; i < remainingSlots; i++) {
                page.push('');
            }
            allPages.push(page);
        }
        setPages(allPages);
    }

    const categoryNavigation = function(direction: string) {
        switch(direction) {
            case 'before':
                if (pageNumber == 1) return;
                setPageNumber(pageNumber - 1);
                break;
            case 'next':
                if (pageNumber == pages.length) return;
                setPageNumber(pageNumber + 1);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            {pages[pageNumber - 1] &&
                <Grid container spacing={1} p={3}>
                    <Grid item md={1}>
                        <IconButton aria-label="navigateBefore" disabled={pageNumber == 1} onClick={() => categoryNavigation('before')}>
                            <NavigateBeforeIcon />
                        </IconButton>
                    </Grid>
                    {pages[pageNumber - 1].map(category => (
                        <Grid item md={1}>
                            <Button color="primary"
                                    variant={selectedCategory == category && category != "" ? outlineVariant : textVariant}
                                    onClick={() => setSelectedCategory(category)}>
                                    {category}
                            </Button>
                        </Grid>
                    ))}
                    <Grid item md={1}>
                        <IconButton aria-label="navigateNext" disabled={pageNumber == pages.length} onClick={() => categoryNavigation('next')}>
                            <NavigateNextIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            }
        </div>
    );
}
export default CategoriesPagination;