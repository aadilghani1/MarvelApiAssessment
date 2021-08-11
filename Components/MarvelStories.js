import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import { useRouter } from "next/router";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    borderColor: "#EF4444",
    backgroundColor: "#FAF3F3",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MarvelStories = ({ dataState, setDataState }) => {
  const classes = useStyles();
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const [errorIndex, setErrorIndex] = useState(null);

  const bull = <span className={classes.bullet}>•</span>;
  const setErrorFunction = (index) => {
    setErrorIndex(index);
    setImgError(true);
  };
  const storiesItemRedirect = (data) => {
    router.push({
      pathname: `/stories/${data.id}`,
    });
  };

  return (
    <div className="flex flex-col space-y-16 ">
      <h3 className="text-center text-3xl font-bold text-red-500 border-t-4 border-b-4 border-red-500">
        Some shorts from our stories
      </h3>
      <Grid item xs={12} className={classes.gridPaper}>
        <Grid container justifyContent="center" spacing={3}>
          {dataState.map((data, index) => (
            <Grid key={index} item>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Stories
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {data.series.items[0].name}
                  </Typography>

                  <Typography variant="body2" component="p">
                    <br />
                    <q>{data.title}</q>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default MarvelStories;
