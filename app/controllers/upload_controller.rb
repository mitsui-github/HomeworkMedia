class UploadController < ApplicationController

    before_action :authenticate_user!

    def index
        @uploads = current_user.uploads
    end

    def new
        @upload = Upload.new
    end

    def create
        upload = Upload.new(upload_params)
        #upload.user = current_userで、現在ログインしているユーザーのidをuser_idとして設定
        upload.user = current_user
        if upload.save
            redirect_to :action => "index"
        else
            render :action => "new"
        end
    end

    private
    def upload_params
        params.require(:upload).permit(:subject, :content, :deadline, :user_id)
    end
end
