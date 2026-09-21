"""Run: python3 -m unittest -v. These public checks are necessary, not sufficient."""
import math
import random
import unittest
import candidate


class CandidateContracts(unittest.TestCase):
    def test_preference_direction(self):
        pairs=[([-2.],0),([-1.],0),([1.],1),([2.],1)]
        w=candidate.fit_preferences(pairs,.7,200,.15)
        self.assertEqual(len(w),1)
        self.assertTrue(math.isfinite(w[0]))
        self.assertGreater(w[0],1.)

    def test_quantization_zero_and_signed_rows(self):
        q,s=candidate.quantize_rows([[0.,0.,0.],[-4.,0.,4.]])
        self.assertEqual(len(q),2)
        self.assertEqual(len(s),2)
        self.assertEqual([v*s[0] for v in q[0]],[0.,0.,0.])
        for row in q:
            self.assertTrue(all(type(v) is int and -127<=v<=127 for v in row))
        self.assertAlmostEqual(q[1][0]*s[1],-4.,delta=.04)
        self.assertAlmostEqual(q[1][2]*s[1],4.,delta=.04)

    def test_matvec(self):
        actual=candidate.quantized_matvec([[2,-3],[0,4]],[.5,2.],[2.,-1.])
        self.assertEqual(len(actual),2)
        for a,b in zip(actual,[3.5,-8.]):self.assertAlmostEqual(a,b)

    def test_bandit_learns_from_interactions(self):
        rng=random.Random(33);calls=[]
        def pull(action):
            calls.append(action)
            return float(rng.random()<[.1,.8,.2][action])
        p=candidate.train_bandit(pull,3,6000,13)
        self.assertEqual(len(p),3)
        self.assertTrue(all(math.isfinite(v) and v>=0 for v in p))
        self.assertAlmostEqual(sum(p),1.)
        self.assertGreater(len(calls),100)
        self.assertGreater(p[1],.8)

    def test_controller_fits_observed_gain(self):
        for gain in (.4,.9):
            episodes=[[([1.,0.],[gain,0.]),([0.,1.],[0.,gain])],
                      [([-1.,2.],[-gain,2*gain])]]
            w=candidate.fit_controller(episodes)
            self.assertEqual(len(w),2)
            self.assertEqual([len(row) for row in w],[2,2])
            for row,expected in zip(w,[[gain,0.],[0.,gain]]):
                for a,b in zip(row,expected):self.assertAlmostEqual(a,b,delta=.015)

if __name__=='__main__':unittest.main()
