import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session'
import cors from 'cors'
import indexRouter from './routes/index.js'
import authRouter from './routes/auth.js';
import categoryRoute from './routes/categoryRoute.js';
import topicRoute from './routes/topicRoute.js';
import topicReplyRoute from './routes/topicReplyRoute.js';
const __dirname = process.cwd()


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', authRouter)
app.use('/category', categoryRoute)
app.use('/topic', topicRoute)
app.use('/topicReply', topicReplyRoute)

export default app

