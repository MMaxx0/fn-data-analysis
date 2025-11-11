import numpy as np
from sklearn.manifold import Isomap
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Load binary data
data = np.fromfile('isomap.dat', dtype=np.int32).astype(np.float64)
X = data.reshape(1396, 512)

X_norm = StandardScaler().fit_transform(X)
isomap = Isomap(n_neighbors=15, n_components=3, eigen_solver='dense')
# Apply ISOMAP dimensionality reduction
X_reduced = isomap.fit_transform(X_norm)

print(f"Shape: {X.shape} → {X_reduced.shape}")
print(f"Reconstruction error: {isomap.reconstruction_error():.2f}")

fig = plt.figure(figsize=(16, 6))
colors = range(len(X_reduced))

# Left subplot: 2D projection (first two components)
ax1 = plt.subplot(121)
ax1.scatter(X_reduced[:, 0], X_reduced[:, 1], c=colors, cmap='viridis', alpha=0.6, s=50)
ax1.set_xlabel('Component 1')
ax1.set_ylabel('Component 2')
ax1.set_title('ISOMAP 2D Projection')
ax1.grid(True, alpha=0.3)

# Right subplot: 3D projection (all three components)
ax2 = fig.add_subplot(122, projection='3d')
scatter = ax2.scatter(X_reduced[:, 0], X_reduced[:, 1], X_reduced[:, 2], 
                      c=colors, cmap='viridis', alpha=0.6, s=50)
ax2.set_xlabel('Component 1')
ax2.set_ylabel('Component 2')
ax2.set_zlabel('Component 3')
ax2.set_title('ISOMAP 3D Projection')
plt.colorbar(scatter, ax=ax2, label='Sample Index')

# Save figure
plt.tight_layout()
plt.savefig('isomap_result.png', dpi=150, bbox_inches='tight')
print("Saved: isomap_result.png, isomap_2d.csv")
