import torch
import pandas as pd
import numpy as np
import matplotlib as plt


scaler = torch.tensor([2, 4])


matrix = torch.tensor([[2, 4],
                       [5, 1]])


tensor = torch.tensor([[[2, 5, 7],
                        [3, 7, 0],
                        [1, 3, 6]]])

random_tensor = torch.rand(1, 3, 2)
print(random_tensor)