<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Thongtinkhachang extends Controller
{
  public function index($id)
  {
    /* if ($id == 1)
      return response()->json([
        'MaKhachHang' => '1',
        'KhuVuc' => [
          'MaKhuVuc' => 'KV1',
          'TenKhuVuc' => 'KHU DÃY NHÀ BẠC ',
          'Kios' => [
            [
              'MaKios' => '1',
              'NganhHang' => 'sữa điện lạnh',
              'ThuNgay' => [
                'MaThuNgay' => '1',
                'MatBang' => 60000,
                'BV' => 1000,
                'VS' => 1500,
              ],
              '2023-10-31' => [
                [
                  'MaNo' => '1',
                  'TienNo' => [
                    'MatBang' => 60000,
                    'BV' => 1000,
                    'VS' => 1500,
                  ]
                ],
                [
                  'MaNo' => '2',
                  'NgayNo' => '2023-10-30',
                  'TienNo' => 62500
                ],
                [
                  'MaNo' => '3',
                  'NgayNo' => '2023-10-29',
                  'TienNo' => 62500
                ]
              ]
            ], [
              'MaKios' => '2',
              'NganhHang' => 'sữa điện lạnh',
              'ThuNgay' => [
                'MaThuNgay' => '4',
                'MatBang' => 60000,
                'BV' => 1000,
                'VS' => 1500,
              ],
              'CongNo' => [
                [
                  'MaNo' => '5',
                  'NgayNo' => '2023-10-31',
                  'TienNo' => 62500
                ],
                [
                  'MaNo' => '6',
                  'NgayNo' => '2023-10-30',
                  'TienNo' => 62500
                ],
                [
                  'MaNo' => '7',
                  'NgayNo' => '2023-10-29',
                  'TienNo' => 62500
                ]
              ]
            ]
          ],
        ],
      ], 200);
    if ($id == 2)
      return response()->json([
        'MaKhachHang' => '2',
        'KhuVuc' => [
          'MaKhuVuc' => 'KV2',
          'TenKhuVuc' => 'KHU DÃY NHÀ BẠC ',
          'Kios' => [
            [
              'MaKios' => '3',
              'NganhHang' => 'sữa điện lạnh',
              'ThuNgay' => [
                'MaThuNgay' => '3',
                'MatBang' => 60000,
                'BV' => 1000,
                'VS' => 1500,
              ],
              'CongNo' => [
                [
                  'MaNo' => '8',
                  'NgayNo' => '2023-10-31',
                  'TienNo' => 62500
                ],
                [
                  'MaNo' => '9',
                  'NgayNo' => '2023-10-30',
                  'TienNo' => 62500
                ],
                [
                  'MaNo' => '10',
                  'NgayNo' => '2023-10-29',
                  'TienNo' => 62500
                ]
              ]
            ], [
              'MaKios' => '4',
              'NganhHang' => 'sữa điện lạnh',
              'ThuNgay' => [
                'MaThuNgay' => '4',
                'MatBang' => 60000,
                'BV' => 1000,
                'VS' => 1500,
              ],
              'CongNo' => [
                [
                  'MaNo' => '11',
                  'NgayNo' => '2023-10-31',
                  'TienNo' => 62500
                ],
                [
                  'MaNo' => '12',
                  'NgayNo' => '2023-10-30',
                  'TienNo' => 62500
                ],
                [
                  'MaNo' => '13',
                  'NgayNo' => '2023-10-29',
                  'TienNo' => 62500
                ]
              ]
            ]
          ],


        ],
      ], 200); */
    if ($id == "KH3")
      return response()->json([
        'MaKhachHang' => '3',
        'KhuVuc' => [
          'NoThangTruoc' => 100000,
          'NoKyQuy' => 10000000,
          'MaKhuVuc' => 'KV1',
          'TenKhuVuc' => 'KHU DÃY NHÀ BẠC ',
          'Kios' => [
            [
              'MaKios' => 'Kios5',
              'NganhHang' => 'sữa điện lạnh',
              'MaThu' => 'MT5',
              'ThuNgay' => [
                'MatBang' => 60000,
                'BV' => 1000,
                'VS' => 1500,
              ],
            ],
            [
              'MaKios' => 'Kios6',
              'NganhHang' => 'sữa điện lạnh',
              'MaThu' => 'MT6',
              'ThuNgay' => [
                'MatBang' => 60000,
                'BV' => 1000,
                'VS' => 1500,
              ],
            ]
          ],
          'CongNo' => [
            [
              'Ngay' => '2023-10-29',
              'ChiTiet' => [
                [
                  'MaKios' => 'Kios5',
                  'MaNo' => 'MN14',
                  'TienNo' => [
                    'MatBang' => 60000,
                    'BV' => 1000,
                    'VS' => 1500,
                  ]
                ],
                [
                  'MaKios' => 'Kios6',
                  'MaNo' => 'MN15',
                  'TienNo' => [
                    'MatBang' => 60000,
                    'BV' => 1000,
                    'VS' => 1500,
                  ]
                ]
              ]
            ],
            [
              'Ngay' => '2023-10-30',
              'ChiTiet' => [
                [
                  'MaKios' => 'Kios5',
                  'MaNo' => 'MN16',
                  'TienNo' => [
                    'MatBang' => 60000,
                    'BV' => 1000,
                    'VS' => 1500,
                  ]
                ],
                [
                  'MaKios' => 'Kios6',
                  'MaNo' => 'MN17',
                  'TienNo' => [
                    'MatBang' => 60000,
                    'BV' => 1000,
                    'VS' => 1500,
                  ]
                ]
              ]
            ],
            [
              'Ngay' => '2023-10-31',
              'ChiTiet' => [
                [
                  'MaKios' => 'Kios5',
                  'MaNo' => 'MN18',
                  'TienNo' => [
                    'MatBang' => 60000,
                    'BV' => 1000,
                    'VS' => 1500,
                  ]
                ],
                [
                  'MaKios' => 'Kios6',
                  'MaNo' => 'MN19',
                  'TienNo' => [
                    'MatBang' => 60000,
                    'BV' => 1000,
                    'VS' => 1500,
                  ]
                ]
              ]
            ]
          ]
        ]
      ], 200);
    return response()->json('Khong tim thay id', 201);
  }
  public function danhsach()
  {
    return response()->json([
      [
        'MaKhachHang' => 'KH1',
        'MaHopDong' => 'SDS1',
        'HoTen' => 'Bùi Văn Hoàng Tý',
        'TienNgay' => 125000,
        'KhuVuc' => [
          'MaKhuVuc' => 'KV1',
          'TenKhuVuc' => 'KHU DÃY NHÀ BẠC ',
          'Kios' => [
            [
              'MaKios' => '22',
              'NganhHang' => 'sữa điện lạnh',
            ], [
              'MaKios' => '30',
              'NganhHang' => 'đồ ăn',
            ]
          ],
        ]
      ],
      [
        'MaKhachHang' => 'KH2',
        'MaHopDong' => 'SDS2',
        'HoTen' => 'Nguyen Van 2',
        'TienNgay' => 125000,
        'KhuVuc' => [
          'MaKhuVuc' => 'KV1',
          'TenKhuVuc' => 'KHU DÃY NHÀ BẠC ',
          'Kios' => [
            [
              'MaKios' => '24',
              'NganhHang' => 'sữa điện lạnh',
            ], [
              'MaKios' => '31',
              'NganhHang' => 'quần áo',
            ]
          ],


        ]
      ],
      [
        'MaKhachHang' => 'KH3',
        'MaHopDong' => 'SDS3',
        'TienNgay' => 125000,
        'HoTen' => 'Nguyen Van 3',
        'KhuVuc' => [
          'MaKhuVuc' => 'KV1',
          'TenKhuVuc' => 'KHU DÃY NHÀ BẠC ',
          'Kios' => [
            [
              'MaKios' => '26',
              'NganhHang' => 'sữa điện lạnh',
            ], [
              'MaKios' => '33',
              'NganhHang' => 'sữa điện lạnh',
            ]
          ],
        ],
      ]
    ], 200);
  }
}
