import { Router } from 'express';

const router = Router();

router.get('/joblist/:userId', (req, res) => {
  req.context.models.Job.find({"userId": req.params.userId}).exec((err, jobs) => {
    if(err) {
      console.log(err);
      return res.status(500).json(err)
    }
    else {
      return res.status(200).send(jobs);
    }
  });
});

router.get('/job/:jobId', (req, res) => {
  req.context.models.Job.find({"_id": req.params.jobId}).exec((err, job) => {
    if(err) {
      console.log(err);
      return res.status(500).json(err)
    }
    else {
      return res.status(200).send(job);
    }
  });
});


router.post('/', async (req, res) => {
  const job = await req.context.models.Job.create({
    company: req.body.company,
    status: req.body.status,
    location: req.body.location,
    position: req.body.position,
    date: req.body.date,
    userId: req.body.userId,
    applicationUrl: req.body.applicationUrl,
    notes: req.body.jobNotes
  });
  return res.send(job);
});

router.put('/', async (req, res) => {
  const formData = req.body.formData;
  req.context.models.Job.findByIdAndUpdate(req.body.jobId, {
                                            company : formData.company,
                                            position: formData.position,
                                            location: formData.location,
                                            date: formData.date,
                                            status: formData.status,
                                            applicationUrl: formData.applicationUrl,
                                            notes: formData.jobNotes
                                          }, (err, job) => {
                                              if (err){
                                                console.log(err);
                                                return res.status(500).json(err);
                                              }
                                              return res.send(job);
                                          });
});

router.delete('/:jobId', async (req, res) => {
  req.context.models.Job.findByIdAndDelete(req.params.jobId).exec((err, deletedJob) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.send(deletedJob);
  });
});

export default router;