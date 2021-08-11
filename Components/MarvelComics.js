import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {},
  control: {
    padding: theme.spacing(2),
  },
  gridPaper: {
    width: 1950,
  },
}));

const Marvel = ({ dataState, setDataState }) => {
  const router = useRouter();
  const classes = useStyles();

  const comicItemRedirect = (data) => {
    router.push({
      pathname: `/comics/${data.id}`,
    });
  };

  return (
    <div className="flex flex-col space-y-16">
      <h3 className="text-center text-3xl font-bold text-red-500 border-t-4 border-b-4 border-red-500">
        Check out some of our Comics
      </h3>
      <Grid item xs={12} className={classes.gridPaper}>
        <Grid container justifyContent="center" spacing={3}>
          {dataState.map((data, index) => (
            <Grid key={index} item>
              {data.thumbnail.path !==
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (
                <Paper elevation={5} className={classes.paper}>
                  <img
                    loading="lazy"
                    src={`${
                      data.thumbnail.path !==
                      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                        ? data.thumbnail.path
                        : ""
                    }/portrait_xlarge.jpg`}
                    className="h-full w-full cursor-pointer hover:opacity-75"
                    alt="Comic"
                    onClick={() => comicItemRedirect(data)}
                  />
                </Paper>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Marvel;
