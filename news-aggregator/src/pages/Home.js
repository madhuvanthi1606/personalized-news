import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import { auth, db } from '../firebase';
import { doc}