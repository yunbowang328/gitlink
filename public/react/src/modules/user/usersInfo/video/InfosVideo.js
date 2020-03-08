import React, { useState, useEffect, useContext, useRef, memo } from 'react';
import {Link} from 'react-router-dom';
import {Pagination, Input, Button} from 'antd'
import { getUrl2, isDev, ThemeContext, ActionBtn, NoneData } from 'educoder'
import axios from 'axios'
import VideoInReviewItem from './VideoInReviewItem'
import EditVideoModal from './EditVideoModal'
import './InfosVideo.css'
import InfoTab from '../common/InfoTab'
import HeadlessModal from '../common/HeadlessModal'
import CRoundSelect from '../common/CRoundSelect'

import ClipboardJS from 'clipboard'

function useModal(initValue) {
    const [visible, setVisible] = useState(initValue)

    return {
        visible,
        setVisible
    }
}
function useCategory(initValue) {
    const [category, setCategory] = useState(initValue)
    function changeCategory(key) {
        setCategory(key)
    }
    return {
        category,
        changeCategory
    }
}
function usePagination() {
    const [page, setPage] = useState(1)
    function onPageChange(page) {
        setPage(page)
    }
    return {
        current: page,
        onChange: onPageChange
    }
}
const PAGE_SIZE = 16
const DEFAULT_VIDEO_WIDTH_IN_MD = "90%" // 400
const DEFAULT_VIDEO_HEIGHT_IN_MD = "55%" // 400
let videoId = {};
let _clipboard = null;
const _items=[
    {key: 'published_at-desc', name: '最新上传'},
    {key: 'published_at-asc', name: '最早上传'},
]
function InfoVideo (props) {
    const [videos, setvideos] = useState(undefined)
    const [reviewvideos, setReviewvideos] = useState(undefined)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [sortKey, setSortKey] = useState(_items[0].key)

    const editModalObj = useModal(false)
    const videoModalObj = useModal(false)
    const categoryObj = useCategory('all')
    const pageObj = usePagination()

    const theme = useContext(ThemeContext);
    const editModalEl = useRef(null);
    const videoEl = useRef(null);

    const { showNotification, history } = props;
    const username = props.match.params.username

    function toUpload() {
        if (props.current_user.admin || (props.current_user.is_teacher && props.checkIfProfessionalCertification())) {
            history.push(`/users/${username}/videos/upload`)
        } else {
            props.showProfessionalCertificationDialog()
        }

    }
    function fetchvideos() {
        const fetchUrl = `/users/${username}/videos.json`
        const sorts = sortKey.split('-')
        setLoading(true)
			axios.get(fetchUrl, {
            params: {
                page: pageObj.current,
                per_page: PAGE_SIZE,
                sort_by: sorts[0],
                sort_direction: sorts[1],
							//
            }
        })
        .then((response) => {
            setLoading(false)
            if (response.data.videos) {
                setvideos(response.data.videos)
                setCount(response.data.count)
            }
        }).catch(() => {
				setLoading(false)
        })
    }
    function fetchReviewvideos() {
        const fetchUrl = `/users/${username}/videos/review.json`
        const sorts = sortKey.split('-')
        setLoading(true)
			axios.get(fetchUrl, {
            params: {
                page: pageObj.current,
                per_page: PAGE_SIZE,
                sort_by: sorts[0],
                sort_direction: sorts[1],
            }
        })
        .then((response) => {
            setLoading(false)
            if (response.data.videos) {
                setReviewvideos(response.data.videos)
                setCount(response.data.count)
            }
        }).catch(() => {

        })
    }

    useEffect(() => {
        if (pageObj.current == 1) {
            if (categoryObj.category == 'all') {
                fetchvideos()
            } else {
                fetchReviewvideos()
            }
        } else {
             pageObj.onChange(1)
        }
    }, [categoryObj.category])

    useEffect(() => {
        if (categoryObj.category == 'all') {
            fetchvideos()
        } else {
            fetchReviewvideos()
        }
    }, [ pageObj.current, sortKey ])

    useEffect(() => {
        if (videoModalObj.visible == false) {
            // 关闭视频
            videoEl.current && videoEl.current.pause()
            if (_clipboard) {
                _clipboard.destroy();
                _clipboard = null;
            }
        } else {
            videoEl.current && videoEl.current.play()

            setTimeout(() => {
                if (!_clipboard) {
                    _clipboard = new ClipboardJS('.copybtn');
                    _clipboard.on('success', (e) => {
                        showNotification('复制成功')
										});
                }
						}, 200)
        }
    }, [videoModalObj.visible])

    useEffect(() => {

    }, [])

    function editSuccess() {
        fetchvideos()
    }

    function onEditVideo(item) {
			videoId = {
            videoId: item.id,
            title: item.title
        }
        editModalObj.setVisible(true)
        // editModalEl.current.toList(true, video);
        // this.refs['editVideoModal'].setVisible(true, video);
    }
    function onMaskClick(item) {
			videoId = {
            videoId: item.id,
            title: item.title,
            file_url: item.file_url,
            cover_url: item.cover_url

        }
        videoModalObj.setVisible(true)
    }
    // TODO use封装
    function onSortChange(key, index) {

        try {
            const _item = _items[index];
            _items.splice(index, 1);
            _items.unshift(_item);
            const keys = key.split('-');
            const sorts = sortKey.split('-');
            if (key === "published_at-desc") {
                if (keys[1] === sorts[1]) {
                    setSortKey("published_at-asc")
                } else {
                    setSortKey(key)
                }
            } else if (key === "published_at-asc") {
                if (keys[1] === sorts[1]) {
                    setSortKey("published_at-desc")
                } else {
                    setSortKey(key)
                }
            }
        } catch (e) {

        }


    }
    function getCopyText (file_url, cover_url) {
        return `<video src="${file_url}" controls="true" controlslist="nodownload" width="${DEFAULT_VIDEO_WIDTH_IN_MD}" height="${DEFAULT_VIDEO_HEIGHT_IN_MD}" poster="${cover_url}">您的浏览器不支持 video 标签。</video>`
    }

	const _inputValue = getCopyText(videoId.file_url, videoId.cover_url);
	const sorts = sortKey.split('-')

    return (
        <div className="educontent infoVideo">
            <EditVideoModal {...props} {...editModalObj}
                editSuccess={editSuccess}
                {...videoId}
            ></EditVideoModal>

            <HeadlessModal
                {...videoModalObj}
                className="showVideoModal"
                width={800 - 1}
            >
							<video
                    autoplay="true"
                    ref={videoEl}
                    src={videoId.file_url} controls="true" controlslist="nodownload">
                    您的浏览器不支持 video 标签。
                </video>
                <div className="df copyLine">
                    <Input value={_inputValue}
                        className="dark"
                    ></Input>
                    <ActionBtn className="copybtn" data-clipboard-text={_inputValue}>复制视频地址</ActionBtn>
                </div>
            </HeadlessModal>
            <style>{`
                
                /* item */
                .videoPublishSuccess .section {
                    background: #fff;
                    padding: 16px 20px;
                    padding-top: 0px;
                    position: relative;

                    text-align: center;
                    color: ${theme.foreground_tip};
                }
                
                    .videoItem .square-main .buttonRow i {
                        vertical-align: top;
                        font-size: 16px;
                        color: ${theme.foreground_select} !important;
                        margin-left: 6px;
                    }

                /* 
                    (26 - 24) * 3 / 2
                 */
                .itemWrap {
                    margin-left: 3px;
                }
                .videoItem {
                    margin-right: 24px;
                }
               .white-panel li.active {
                  border-radius: 24px;
                  border: none !important;
                  color: #4CACFF;
              }
                   .whitepanelysllisyt {
             width: 70px !important;
              height: 48px !important;
              line-height: 46px !important;
         
              }
                  .whitepanelysllisyts {
             width: 80px !important;
              height: 48px !important;
              line-height: 46px !important;
               margin-left: 30px;
              }

            `}</style>

            <InfoTab
                {...props}
                categories={[{
                    key: 'all',
                    name: '全部视频',
                    id: 1,
                }, {
                    key: 'review',
                    name: '待审核视频',
                    id: 2
                }]}
                {...categoryObj}

                right={
                    <Button type="primary" icon="upload"
                        onClick={() => { toUpload() }}
                        className="toUploadBtn"

										>
                        上传视频
                    </Button>
                }
            ></InfoTab>

					<div className="toolbarRow  df" style={{
						lineHeight: "40px",
					}}>
                <span>
                    共
                    <span style={{color: theme.foreground_orange1}}> {count} </span>
                    个视频
                </span>

                {/*{categoryObj.category == 'all' && <CRoundSelect {...props}*/}
                    {/*width={'90px'}*/}
                    {/*items={_items}*/}
                    {/*onSortChange={onSortChange}*/}
                    {/*sortKey={sortKey }*/}
                {/*></CRoundSelect>}*/}

							{categoryObj.category == 'all' &&<div className="fr">
								<li className="drop_down">
									<span className="color-grey-9 font-12" style={{
										marginRight: " 5px",
									}}>{"最新上传"}</span>

                    <sapn className="relativef color-grey-9 fr"
                          style={{
													display: "flex",
													flexDirection: "column",
													height: "40px",
													lineHeight: "40px",
												}}
									>
            <span
							style={{
								flexDirection: "column",
								textAlign: "center",
								height: "10px",
								lineHeight: "10px",
								display: "table",
								marginTop: "9px",
							}}
						>
                 <i className={sorts[1] === "asc" ?
									 "iconfont icon-sanjiaoxing-up font-12  color-blue h10 " : "iconfont icon-sanjiaoxing-up font-12 h10"}
										onClick={() => onSortChange("published_at-asc", 0)}></i>

            </span>

										<span
											style={{
												flexDirection: "column",
												height: "10px",
												lineHeight: "10px",
												textAlign: "center",
												display: "table",
											}}
										>
                          <i className={sorts[1] === "desc" ?
														"iconfont icon-sanjiaoxing-down font-12 yslbottomsj color-blue h10" : "iconfont icon-sanjiaoxing-down font-12 yslbottomsj h10"}
														 onClick={() => onSortChange("published_at-desc", 0)}></i>
            </span>
									</sapn>
								</li>
							</div>}
            </div>


					{categoryObj.category == 'all' ?
             <div className="itemWrap">
                {
									videos == undefined ? '' :
										videos.length ?
                 videos.map((item, index) => {
                    return (<VideoInReviewItem
                        {...props}

                        {...item}
                        key={item.id}
                        onEditVideo={onEditVideo}
                        onMaskClick={onMaskClick}
                        getCopyText={getCopyText}

										>
                    </VideoInReviewItem>)
                })
                : <NoneData style={{width: '100%'}}></NoneData>
                }
            </div>
            :
            <div className="itemWrap">
                {
                reviewvideos == undefined ? '' :
									reviewvideos.length ?
                reviewvideos.map((item, index) => {
                    return (<VideoInReviewItem
                        {...props}

                        {...item}
                        key={item.id}
                        isReview={true}
                    >
                    </VideoInReviewItem>)
                })
                : <NoneData style={{width: '100%'}}></NoneData>
                }
            </div>
            }


					{/*  categoryObj.category == 'all' &&  */}
            {
							count > PAGE_SIZE &&
                <div className="mt30 mb50 edu-txt-center">
									<Pagination showQuickJumper total={count} pageSize={PAGE_SIZE}
															{...pageObj}
                    />
                </div>
            }

				</div>
    )
}

export default InfoVideo

/**
<video src="http://outin-396971199eed11e991a100163e1c7426.oss-cn-shanghai.aliyuncs.com/sv/52943d8b-16c8dc2a8ca/52943d8b-16c8dc2a8ca.mp4" controls="true" controlslist="nodownload" width="400">
您的浏览器不支持 video 标签。
</video>

 */
