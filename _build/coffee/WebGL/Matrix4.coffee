
do ( win = window, doc = document, exports = window ) ->

	class Matrix4

		constructor : () ->

			throw "Matrix4 cant be instantiated."

		@create : () =>

			return @identity()

		@identity : () =>

			dest = [

				1, 0, 0, 0
				0, 1, 0, 0
				0, 0, 1, 0
				0, 0, 0, 1
			]

			return dest

		@get_multiply : ( mat_a, mat_b ) =>

			a11 = mat_a[0];  a12 = mat_a[1];  a13 = mat_a[2];  a14 = mat_a[3]
			a21 = mat_a[4];  a22 = mat_a[5];  a23 = mat_a[6];  a24 = mat_a[7]
			a31 = mat_a[8];  a32 = mat_a[9];  a33 = mat_a[10]; a34 = mat_a[11]
			a41 = mat_a[12]; a42 = mat_a[13]; a43 = mat_a[14]; a44 = mat_a[15]

			b11 = mat_b[0];  b12 = mat_b[1];  b13 = mat_b[2];  b14 = mat_b[3]
			b21 = mat_b[4];  b22 = mat_b[5];  b23 = mat_b[6];  b24 = mat_b[7]
			b31 = mat_b[8];  b32 = mat_b[9];  b33 = mat_b[10]; b34 = mat_b[11]
			b41 = mat_b[12]; b42 = mat_b[13]; b43 = mat_b[14]; b44 = mat_b[15]

			dest = [

				a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41
				a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42
				a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43
				a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44

				a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41
				a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42
				a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43
				a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44

				a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41
				a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42
				a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43
				a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44

				a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41
				a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42
				a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43
				a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44
			]

			return dest

		@get_scale : ( vec ) =>

			x = vec[0]
			y = vec[1]
			z = vec[2]

			dest = [

				x, 0, 0, 0
				0, y, 0, 0
				0, 0, z, 0
				0, 0, 0, 1
			]

			return dest

		@get_rotate_x : ( angle ) =>

			s = Math.sin angle
			c = Math.cos angle

			dest = [

				1, 0,  0, 0
				0, c,  s, 0
				0, -s, c, 0
				0, 0,  0, 1
			]

			return dest

		@get_rotate_y : ( angle ) =>

			s = Math.sin angle
			c = Math.cos angle

			dest = [

				c, 0, -s, 0
				0, 1,  0, 0
				s, 0,  c, 0
				0, 0,  0, 1
			]

			return dest

		@get_rotate_z : ( angle ) =>

			s = Math.sin angle
			c = Math.cos angle

			dest = [

				 c, s, 0, 0
				-s, c, 0, 0
				 0, 0, 1, 0
				 0, 0, 0, 1
			]

			return dest

		@get_translate : ( vec ) =>

			x = vec[0]
			y = vec[1]
			z = vec[2]

			dest = [

				1, 0, 0, 0
				0, 1, 0, 0
				0, 0, 1, 0
				x, y, z, 1
			]

			return dest

		@get_view : ( position, target, top ) =>

			x1 = position[0] - target[0]
			y1 = position[1] - target[1]
			z1 = position[2] - target[2]

			l1 = Math.sqrt ( x1 * x1 ) + ( y1 * y1 ) + ( z1 * z1 )

			zx = x1 / l1
			zy = y1 / l1
			zz = z1 / l1

			x2 = ( top[1] * zz ) - ( top[2] * zy )
			y2 = ( top[2] * zx ) - ( top[0] * zz )
			z2 = ( top[0] * zy ) - ( top[1] * zx )

			l2 = Math.sqrt ( x2 * x2 ) + ( y2 * y2 ) + ( z2 * z2 )

			xx = x2 / l2
			xy = y2 / l2
			xz = z2 / l2

			x3 = ( zy * xz ) - ( zz * xy )
			y3 = ( zz * xx ) - ( zx * xz )
			z3 = ( zx * xy ) - ( zy * xx )

			l3 = Math.sqrt ( x3 * x3 ) + ( y3 * y3 ) + ( z3 * z3 )

			yx = x3 / l3
			yy = y3 / l3
			yz = z3 / l3

			px = ( position[0] * xx ) + ( position[1] * xy ) + ( position[2] * xz )
			py = ( position[0] * yx ) + ( position[1] * yy ) + ( position[2] * yz )
			pz = ( position[0] * zx ) + ( position[1] * zy ) + ( position[2] * zz )

			dest = [

				 xx,  xy,  xz, 0
				 yx,  yy,  yz, 0
				 zx,  zy,  zz, 0
				-px, -py, -pz, 1
			]

			return dest

		@get_projection : ( fov_y, aspect, near, far ) =>

			rad = ( Math.PI / 180 ) * fov_y

			m22 = 1 / Math.tan( rad / 2 )
			m11 = m22 / aspect
			m33 = -far / ( far - near )
			m34 = -( far * near ) / ( far - near )

			dest = [

				m11,   0,   0,  0
				  0, m22,   0,  0
				  0,   0, m33, -1
				  0,   0, m34,  0
			]

			return dest

		@get_inverse : ( mat ) =>

			a11 = mat[0];  a12 = mat[1];  a13 = mat[2];  a14 = mat[3]
			a21 = mat[4];  a22 = mat[5];  a23 = mat[6];  a24 = mat[7]
			a31 = mat[8];  a32 = mat[9];  a33 = mat[10]; a34 = mat[11]
			a41 = mat[12]; a42 = mat[13]; a43 = mat[14]; a44 = mat[15]

			n1  = a11 * a22 - a12 * a21; n2  = a11 * a23 - a13 * a21
			n3  = a11 * a24 - a14 * a21; n4  = a12 * a23 - a13 * a22
			n5  = a12 * a24 - a14 * a22; n6  = a13 * a24 - a14 * a23
			n7  = a31 * a42 - a32 * a41; n8  = a31 * a43 - a33 * a41
			n9  = a31 * a44 - a34 * a41; n10 = a32 * a43 - a33 * a42
			n11 = a32 * a44 - a34 * a42; n12 = a33 * a44 - a34 * a43

			b11 = a22 *  n12 - a23 * n11 + a24 * n10
			b12 = a12 * -n12 + a13 * n11 - a14 * n10
			b13 = a42 *  n6  - a43 * n5  + a44 * n4
			b14 = a32 * -n6  + a33 * n5  - a34 * n4
			b21 = a21 * -n12 + a23 * n9  - a24 * n8
			b22 = a11 *  n12 - a13 * n9  + a14 * n8
			b23 = a41 * -n6  + a43 * n3  - a44 * n2
			b24 = a31 *  n6  - a33 * n3  + a34 * n2
			b31 = a21 *  n11 - a22 * n9  + a24 * n7
			b32 = a11 * -n11 + a12 * n9  - a14 * n7
			b33 = a41 *  n5  - a42 * n3  + a44 * n1
			b34 = a31 * -n5  + a32 * n3  - a34 * n1
			b41 = a21 * -n10 + a22 * n8  - a23 * n7
			b42 = a11 *  n10 - a12 * n8  + a13 * n7
			b43 = a41 * -n4  + a42 * n2  - a43 * n1
			b44 = a31 *  n4  - a32 * n2  + a33 * n1

			det = a11 * b11 + a21 * b12 + a31 * b13 + a41 * b14

			dest = [

				b11 / det, b12 / det, b13 / det, b14 / det
				b21 / det, b22 / det, b23 / det, b24 / det
				b31 / det, b32 / det, b33 / det, b34 / det
				b41 / det, b42 / det, b43 / det, b44 / det
			]

			return dest


	exports.Matrix4 = Matrix4
