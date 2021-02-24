const {utils,VotingSystem} = require('votes');

const vtstm = {fpp:'First Past The Post',irv:'Instant Runoff',rkp:'Ranked Pairs',bdc:'Borda',shz:'Schulze'}

window.ranktextarea = (cands, tally, vtmhd) => {
    tally = tally.split('\n');
    tally.forEach((e, i) => {
        tally[i]=e.split(',')
    });
    tally.forEach((e, i) => {
        e.forEach((a, b) => {
            tally[i][b]=[a.trim()];
        });
    });
    ballot = [];
    tally.forEach(e=>ballot.push({ranking:e,weight:1}));
    cands = cands.split(',');
    cands.forEach((e, i) => {
        cands[i]=e.trim();
    });
    const scores = utils.scoresFromBallots(ballot,cands,VotingSystem[vtstm[vtmhd].replace(/ /g,'')]);
    return {scores:scores,ranking:utils.scoresToRanking(scores),method:vtstm[vtmhd]};
};

const data = {
    cands: 'Memphis,Nashville,Knoxville,Chattanooga',
    tally: {
        m: 'Memphis,Nashville,Chattanooga,Knoxville\n',
        n: 'Nashville,Chattanooga,Knoxville,Memphis\n',
        k: 'Knoxville,Chattanooga,Nashville,Memphis\n',
        c: 'Chattanooga,Knoxville,Nashville,Memphis\n'
    }
};

window.example = () => {
    return {cands:data.cands,tally:(data.tally.m.repeat(42)+data.tally.n.repeat(26)+data.tally.k.repeat(17)+data.tally.c.repeat(15)).slice(0,-1)}
};
